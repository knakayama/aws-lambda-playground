output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}

output "cf_domain_name" {
  value = "${module.cloudfront.domain_name}"
}

output "s3_bucket" {
  value = "${module.s3.bucket}"
}
