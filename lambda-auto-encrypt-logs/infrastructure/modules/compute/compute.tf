resource "aws_key_pair" "key_pair" {
  key_name   = "${var.name}-key-pair"
  public_key = "${file("${path.module}/keys/site_key.pub")}"
}

resource "aws_instance" "web" {
  ami                         = "${var.amazon_linux_id}"
  instance_type               = "${var.instance_types["web"]}"
  vpc_security_group_ids      = ["${aws_security_group.web.id}"]
  subnet_id                   = "${aws_subnet.application_subnet.0.id}"
  key_name                    = "${aws_key_pair.key_pair.key_name}"
  user_data                   = "${file("${path.module}/user_data/web_cloud_config.yml")}"
  associate_public_ip_address = true

  root_block_device {
    volume_type = "gp2"
    volume_size = 8
  }

  tags {
    Name = "${var.name}-web"
  }
}
