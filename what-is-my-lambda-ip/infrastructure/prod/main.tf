module "iam" {
  source = "../modules/iam"

  name = "${var.name}"
}

module "api_gateway" {
  source = "../modules/api_gateway"

  name       = "${var.name}"
  aws_region = "${var.aws_region}"
  lambda_arn = "${var.apex_function_what_is_my_lambda_ip}"
}

module "s3" {
  source = "../modules/s3"

  name      = "${var.name}"
  s3_config = "${var.s3_config}"
}

module "cloudfront" {
  source = "../modules/cloudfront"

  name                = "${var.name}"
  aws_region          = "${var.aws_region}"
  api_gateway_id      = "${module.api_gateway.id}"
  cf_config           = "${var.cf_config}"
  s3_bucket           = "${module.s3.bucket}"
  s3_website_endpoint = "${module.s3.website_endpoint}"
}
