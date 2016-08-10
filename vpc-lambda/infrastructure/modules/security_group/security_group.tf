resource "aws_security_group" "lambda" {
  name        = "${var.name}-lambda"
  vpc_id      = "${var.vpc_id}"
  description = "${replace(var.name, "_", " ")}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "${var.name}-lambda"
  }
}
