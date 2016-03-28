
resource "aws_iam_role" "lambda_function" {
  name = "apex_lambda_function_slack"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "cloudwatchlogs_full_access" {
  name = "cloudwatchlogs_full_access"
  role = "${aws_iam_role.lambda_function.id}"
  policy = <<EOT
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "logs:*",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": "KMS:Decrypt",
      "Effect": "Allow",
      "Resource": "arn:aws:kms:ap-northeast-1:804256469719:key/fdef6db3-1e7a-47c9-930c-355bc9b1b4e3"
    }
  ]
}
EOT
}

output "lambda_function_role_arn" { value = "${aws_iam_role.lambda_function.arn}" }
