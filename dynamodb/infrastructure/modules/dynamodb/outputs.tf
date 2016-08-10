output "arn" {
  value = "${aws_dynamodb_table.dynamodb.arn}"
}

output "id" {
  value = "${aws_dynamodb_table.dynamodb.id}"
}
