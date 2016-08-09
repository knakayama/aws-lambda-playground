variable "aws_region" {}

variable "apex_function_vpc_lambda" {}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "name" {
  default = "vpc-lambda"
}
