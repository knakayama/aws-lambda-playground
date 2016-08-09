output "private_subnet_id" {
  value = "${aws_subnet.private.id}"
}

output "private_subnet_cidr_block" {
  value = "${aws_subnet.private.cidr_block}"
}

output "vpc_id" {
  value = "${aws_vpc.vpc.id}"
}
