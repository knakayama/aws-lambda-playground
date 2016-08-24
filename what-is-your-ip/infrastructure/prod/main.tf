module "iam" {
  source = "../modules/iam"

  name = "${var.name}"
}

module "api_gateway" {
  source = "../modules/api_gateway"

  name       = "${var.name}"
  aws_region = "${var.aws_region}"
  lambda_arn = "${var.apex_function_what_is_your_ip}"
}

module "cloudfront" {
  source = "../modules/cloudfront"

  name           = "${var.name}"
  aws_region     = "${var.aws_region}"
  api_gateway_id = "${module.api_gateway.id}"
  cf_config      = "${var.cf_config}"
}
