output "public_ip" {
  value = "${aws_instance.web.public_ip}"
}

output "elb_dns_name" {
  value = "${aws_elb.elb.dns_name}"
}

output "cf_s3_bucket" {
  value = "${aws_s3_bucket.cf_log.bucket}"
}
