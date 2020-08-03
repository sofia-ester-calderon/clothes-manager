data "aws_acm_certificate" "ssl_cert" {
  domain   = "${var.root_domain_name}"
  statuses = ["ISSUED"]
}

resource "aws_s3_bucket" "s3_bucket" {
  bucket        = var.application_subdomain
  force_destroy = true
  acl           = "public-read"
  policy        = <<POLICY
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


