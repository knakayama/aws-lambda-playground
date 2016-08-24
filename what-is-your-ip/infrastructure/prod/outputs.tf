output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}

output "cf_domain_name" {
  value = "${module.cloudfront.domain_name}"
}
