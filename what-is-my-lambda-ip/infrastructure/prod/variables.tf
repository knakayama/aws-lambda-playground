variable "name" {
  default = "what-is-my-lambda-ip"
}

variable "aws_region" {}

variable "apex_function_what_is_my_lambda_ip" {}

variable "s3_config" {
  default = {
    index = "index.html"
  }
}

variable "cf_config" {
  default = {
    price_class = "PriceClass_200"
  }
}
