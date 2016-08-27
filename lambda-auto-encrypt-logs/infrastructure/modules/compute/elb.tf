resource "aws_elb" "elb" {
  name                        = "${var.name}-elb"
  subnets                     = ["${aws_subnet.frontend_subnet.*.id}"]
  security_groups             = ["${aws_security_group.elb.id}"]
  cross_zone_load_balancing   = true
  connection_draining         = true
  connection_draining_timeout = 300
  idle_timeout                = 60
  instances                   = ["${aws_instance.web.id}"]

  listener {
    lb_port           = 80
    lb_protocol       = "http"
    instance_port     = 80
    instance_protocol = "http"
  }

  health_check {
    healthy_threshold   = 10
    unhealthy_threshold = 2
    timeout             = 5
    target              = "HTTP:80/index.html"
    interval            = 30
  }

  access_logs {
    bucket   = "${aws_s3_bucket.elb_log.bucket}"
    interval = 5
  }

  tags {
    Name = "${var.name}-elb"
  }
}
