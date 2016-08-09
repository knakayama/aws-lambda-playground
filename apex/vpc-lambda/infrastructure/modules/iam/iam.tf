resource "aws_iam_role" "lambda_function" {
  name               = "${var.name}-role"
  assume_role_policy = "${file("${path.module}/policy/lambda_assume_role_policy.json")}"
}

resource "aws_iam_policy_attachment" "vpc_access_execution" {
  name       = "LambdaVPCAccessExecution"
  roles      = ["${aws_iam_role.lambda_function.name}"]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_iam_policy_attachment" "sns_full_access" {
  name       = "SNSFullAccess"
  roles      = ["${aws_iam_role.lambda_function.name}"]
  policy_arn = "arn:aws:iam::aws:policy/AmazonSNSFullAccess"
}
