output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}

output "private_subnet_id" {
  value = "${module.network.private_subnet_id}"
}

output "vpc_id" {
  value = "${module.network.vpc_id}"
}

output "security_group_id_lambda" {
  value = "${module.security_group.id_lambda}"
}

output "sns_topic_id" {
  value = "${module.sns.topic_arn}"
}
