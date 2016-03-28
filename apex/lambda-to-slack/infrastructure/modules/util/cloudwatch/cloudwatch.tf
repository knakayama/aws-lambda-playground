variable "name"            { default = "cloudwatch" }
variable "ec2_instance_id" { }

resource "aws_sns_topic" "sns" {
  name = "${var.name}"
}

# TODO: specify lambda endpoind
#resource "aws_sns_topic_subscription" "sns" {
#  topic_arn = "${aws_sns_topic.sns.arn}"
#  protocol  = "lambda"
#  endpoint  = "lambda-endpoint"
#}

resource "aws_cloudwatch_metric_alarm" "cloudwatch_web" {
  alarm_name                = "${var.name}"
  alarm_description         = "EC2 CPU Monitoring"
  comparison_operator       = "GreaterThanOrEqualToThreshold"
  evaluation_periods        = 1
  metric_name               = "CPUUtilization"
  namespace                 = "AWS/EC2"
  period                    = 60
  statistic                 = "Average"
  threshold                 = 10
  alarm_actions             = ["${aws_sns_topic.sns.arn}"]
  insufficient_data_actions = ["${aws_sns_topic.sns.arn}"]
  ok_actions                = ["${aws_sns_topic.sns.arn}"]

  dimensions {
    InstanceId = "${var.ec2_instance_id}"
  }
}
