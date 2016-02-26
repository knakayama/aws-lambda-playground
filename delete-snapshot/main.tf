variable "name"              { }
variable "region"            { }
variable "atlas_token"       { }
variable "atlas_username"    { }
variable "atlas_environment" { }

variable "az"            { }
variable "vpc_cidr"      { }
variable "public_subnet" { }

variable "instance_ami_id" { }
variable "instance_type"   { }

variable "runtime"            { }
variable "event_pattern"      { }
variable "assume_role_policy" { }
variable "policy"             { }

provider "aws" {
  region = "${var.region}"
}

atlas {
  name = "${var.atlas_username}/${var.atlas_environment}"
}

resource "terraform_remote_state" "aws_global" {
  backend = "atlas"

  config {
    name = "${var.atlas_username}/${var.atlas_environment}"
  }

  lifecycle { create_before_destroy = true }
}

resource "aws_vpc" "vpc" {
  cidr_block           = "${var.vpc_cidr}"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags { Name = "${var.name}" }
}

resource "aws_internet_gateway" "public" {
  vpc_id = "${aws_vpc.vpc.id}"

  tags { Name = "${var.name}" }
}

resource "aws_subnet" "public" {
  vpc_id                  = "${aws_vpc.vpc.id}"
  cidr_block              = "${var.public_subnet}"
  availability_zone       = "${var.az}"
  map_public_ip_on_launch = true

  tags { Name = "${var.name}" }
}

resource "aws_route_table" "public" {
  vpc_id = "${aws_vpc.vpc.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.public.id}"
  }

  tags { Name = "${var.name}" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = "${aws_subnet.public.id}"
  route_table_id = "${aws_route_table.public.id}"
}

resource "aws_security_group" "ec2" {
  name        = "${var.name}"
  vpc_id      = "${aws_vpc.vpc.id}"
  description = "EC2 SG"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags { Name = "${var.name}" }
}

resource "aws_instance" "ec2" {
  ami                         = "${var.instance_ami_id}"
  subnet_id                   = "${aws_subnet.public.id}"
  instance_type               = "${var.instance_type}"
  vpc_security_group_ids      = ["${aws_security_group.ec2.id}"]
  associate_public_ip_address = true

  root_block_device = {
    volume_type = "gp2"
    volume_size = 8
  }

  tags { Name = "${var.name}" }
}

resource "aws_ami_from_instance" "temp" {
    name               = "${var.name}"
    source_instance_id = "${aws_instance.ec2.id}"
}

resource "aws_iam_role" "lambda" {
  name               = "${var.name}"
  assume_role_policy = "${file(var.assume_role_policy)}"
}

resource "aws_iam_policy" "lambda" {
  name        = "${var.name}-policy"
  path        = "/"
  description = "${var.name} policy"
  policy      = "${file(var.policy)}"
}

resource "aws_iam_policy_attachment" "lambda_role_attachment" {
  name       = "${var.name}"
  roles      = ["${aws_iam_role.lambda.name}"]
  policy_arn = "${aws_iam_policy.lambda.arn}"
}

resource "aws_lambda_function" "lambda" {
  filename      = "${var.name}.zip"
  function_name = "${var.name}"
  role          = "${aws_iam_role.lambda.arn}"
  handler       = "${var.name}.lambda_handler"
  runtime       = "${var.runtime}"
  timeout       = 15
}

resource "aws_cloudwatch_event_rule" "event_rule_for_lambda" {
  name          = "${var.name}"
  description   = "Delete AMI snapshot with lambda"
  event_pattern = "${file(var.event_pattern)}"
}

resource "aws_cloudwatch_event_target" "event_target_for_lambda" {
  rule      = "${aws_cloudwatch_event_rule.event_rule_for_lambda.name}"
  target_id = "${var.name}"
  arn       = "${aws_lambda_function.lambda.arn}"
}

#resource "null_resource" "null" {
#  provisioner "local-exec" {
#    command = "sudo apt-get install zip && zip delete_snapshot.zip delete_snapshot.py"
#  }
#}
