module "iam" {
  source = "../modules/iam"

  name = "${var.name}"
}

module "dynamodb" {
  source = "../modules/dynamodb"
}
