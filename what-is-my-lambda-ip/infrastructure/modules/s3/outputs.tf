output "bucket" {
  value = "${aws_s3_bucket.s3.id}"
}

output "website_endpoint" {
  value = "${aws_s3_bucket.s3.website_endpoint}"
}
