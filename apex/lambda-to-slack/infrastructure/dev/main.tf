variable "name"            { }
variable "region"          { }
variable "site_public_key" { }

variable "vpc_cidr"      { }
variable "az"            { }
variable "public_subnet" { }

variable "ec2_instance_type"   { }
variable "ec2_instance_ami_id" { }

resource "aws_key_pair" "site_key" {
  key_name   = "${var.name}"
  public_key = "${var.site_public_key}"
}

module "iam" {
  source = "../modules/util/iam"
}

module "network" {
  source = "../modules/network"

  name          = "${var.name}"
  az            = "${var.az}"
  vpc_cidr      = "${var.vpc_cidr}"
  public_subnet = "${var.public_subnet}"
}

module "compute" {
  source = "../modules/compute"

  name                = "${var.name}"
  vpc_id              = "${module.network.vpc_id}"
  key_name            = "${aws_key_pair.site_key.key_name}"
  public_subnet_id    = "${module.network.public_subnet_id}"
  ec2_instance_type   = "${var.ec2_instance_type}"
  ec2_instance_ami_id = "${var.ec2_instance_ami_id}"
}

module "cloudwatch" {
  source = "../modules/util/cloudwatch"

  name            = "${var.name}"
  ec2_instance_id = "${module.compute.ec2_instance_id}"
}

output "ec2_public_ip"            { value = "${module.compute.ec2_public_ip}" }
output "lambda_function_role_arn" { value = "${module.iam.lambda_function_role_arn}" }
