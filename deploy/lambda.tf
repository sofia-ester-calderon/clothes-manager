resource "aws_lambda_function" "closet-manager-api" {
  function_name = "colors_api"

  s3_bucket = var.application_subdomain
  s3_key    = "lambas/backend.zip"

  handler = "module.exports"
  runtime = "nodejs10.x"

  role = aws_iam_role.lambda_exec.arn
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "colors_api_lambda"

  assume_role_policy = <<EOF
 {
   "Version": "2012-10-17",
   "Statement": [
     {
       "Action": "sts:AssumeRole",
       "Principal": {
         "Service": "lambda.amazonaws.com"
       },
       "Effect": "Allow",
       "Sid": ""
     }
   ]
 }
 EOF

}
