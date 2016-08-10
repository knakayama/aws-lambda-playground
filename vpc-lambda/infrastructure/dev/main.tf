module "iam" {
  source = "../modules/iam"

  name = "${var.name}"
}

module "network" {
  source = "../modules/network"

  vpc_cidr = "${var.vpc_cidr}"
}

module "security_group" {
  source = "../modules/security_group"

  name   = "${var.name}"
  vpc_id = "${module.network.vpc_id}"
}

module "sns" {
  source = "../modules/sns"

  name = "${var.name}"
}
