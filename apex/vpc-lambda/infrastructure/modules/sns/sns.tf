resource "aws_sns_topic" "sns" {
  name         = "${var.name}"
  display_name = "${var.name}"
}
