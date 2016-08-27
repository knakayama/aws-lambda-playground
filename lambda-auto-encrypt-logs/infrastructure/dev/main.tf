module "iam" {
  source = "../modules/iam"

  name = "${var.name}"
}

module "compute" {
  source = "../modules/compute"

  name            = "${var.name}"
  vpc_cidr        = "${var.vpc_cidr}"
  azs             = "${data.aws_availability_zones.az.names}"
  s3_config       = "${var.s3_config}"
  instance_types  = "${var.instance_types}"
  amazon_linux_id = "${data.aws_ami.amazon_linux.id}"
  lambda_arn      = "${var.apex_function_lambda_auto_encrypt_logs}"
}

module "cloudfront" {
  source = "../modules/cloudfront"

  name         = "${var.name}"
  elb_dns_name = "${module.compute.elb_dns_name}"
  cf_config    = "${var.cf_config}"
  cf_s3_bucket = "${module.compute.cf_s3_bucket}"
}
