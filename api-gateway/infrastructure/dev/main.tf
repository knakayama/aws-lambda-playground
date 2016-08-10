variable "aws_region" {
  default = "ap-northeast-1"
}

module "iam" {
  source = "../modules/iam"
}

module "api_gateway" {
  source = "../modules/api_gateway"

  aws_region                = "${var.aws_region}"
  gateway_invoke_lambda_arn = "${module.iam.gateway_invoke_lambda_arn}"
}

output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}
