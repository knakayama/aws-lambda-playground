variable "name" {
  default = "lambda-auto-encrypt-logs"
}

variable "aws_region" {}

variable "apex_function_lambda_auto_encrypt_logs" {}

variable "vpc_cidr" {
  default = "172.16.0.0/16"
}

variable "instance_types" {
  default = {
    "web" = "t2.nano"
  }
}

variable "cf_config" {
  default = {
    "price_class" = "PriceClass_200"
  }
}

variable "s3_config" {
  default = {
    index = "index.html"
  }
}

data "aws_availability_zones" "az" {}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "name"
    values = ["amzn-ami-hvm-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "block-device-mapping.volume-type"
    values = ["gp2"]
  }
}
