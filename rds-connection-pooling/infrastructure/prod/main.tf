module "iam" {
  source = "../modules/iam"

  name = "${var.name}"
}
