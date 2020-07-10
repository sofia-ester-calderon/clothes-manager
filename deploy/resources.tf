data "aws_acm_certificate" "ssl_cert" {
  domain   = "${var.root_domain_name}"
  statuses = ["ISSUED"]
}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.application_subdomain
  force_destroy = true
  acl    = "public-read"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "REACTCLOTHESMANAGERBUCKETPOLICY",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::${var.application_subdomain}/*"]
    }
  ]
}
POLICY
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_cloudfront_distribution" "frontend_cloudfront_distribution" {
  origin {
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
    domain_name = aws_s3_bucket.s3_bucket.website_endpoint
    origin_id   = var.application_subdomain
  }
  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.application_subdomain

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_caching_min_ttl = 3000
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  aliases = [var.application_subdomain]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.ssl_cert.arn
    ssl_support_method  = "sni-only"
  }

}

resource "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_route53_record" "frontend_record" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = var.application_subdomain
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.frontend_cloudfront_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}