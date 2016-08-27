output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}

output "public_ip" {
  value = "${module.compute.public_ip}"
}

output "cf_domain_name" {
  value = "${module.cloudfront.domain_name}"
}
