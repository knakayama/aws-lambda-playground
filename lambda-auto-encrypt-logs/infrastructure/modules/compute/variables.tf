variable "name" {}

variable "vpc_cidr" {}

variable "azs" {
  type = "list"
}

variable "s3_config" {
  type = "map"
}

variable "instance_types" {
  type = "map"
}

variable "amazon_linux_id" {}

variable "lambda_arn" {}
