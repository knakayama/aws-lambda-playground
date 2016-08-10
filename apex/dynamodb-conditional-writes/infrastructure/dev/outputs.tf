output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}

output "dynamodb_arn" {
  value = "${module.dynamodb.arn}"
}

output "dynamodb_id" {
  value = "${module.dynamodb.id}"
}
