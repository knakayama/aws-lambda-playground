variable "name" {}

variable "aws_region" {}

variable "api_gateway_id" {}

variable "cf_config" {
  type = "map"
}

variable "s3_bucket" {}

variable "s3_website_endpoint" {}
