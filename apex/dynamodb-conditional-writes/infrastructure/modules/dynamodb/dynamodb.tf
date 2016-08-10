resource "aws_dynamodb_table" "dynamodb" {
  name           = "${var.table_name}"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "Key"

  attribute {
    name = "Key"
    type = "S"
  }
}
