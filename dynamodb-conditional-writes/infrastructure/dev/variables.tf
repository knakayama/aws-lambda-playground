variable "aws_region" {}

variable "name" {
  default = "dynamodb-conditional-writes"
}

variable "table_name" {
  default = "TestTable"
}
