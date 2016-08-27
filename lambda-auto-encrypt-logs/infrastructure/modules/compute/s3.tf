data "aws_elb_service_account" "elb_log" {}

data "aws_iam_policy_document" "elb_log" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    resources = [
      "arn:aws:s3:::${var.name}-elb-log/*",
    ]

    principals = {
      type = "AWS"

      identifiers = [
        "${data.aws_elb_service_account.elb_log.id}",
      ]
    }
  }
}

resource "aws_s3_bucket" "elb_log" {
  bucket        = "${var.name}-elb-log"
  acl           = "private"
  policy        = "${data.aws_iam_policy_document.elb_log.json}"
  force_destroy = true
}

resource "aws_s3_bucket" "cf_log" {
  bucket        = "${var.name}-cf-log"
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket_notification" "elb_log" {
  bucket = "${aws_s3_bucket.elb_log.id}"

  lambda_function {
    lambda_function_arn = "${var.lambda_arn}"
    events              = ["s3:ObjectCreated:Put"]
  }
}

resource "aws_lambda_permission" "elb_log" {
  statement_id  = "AllowExecutionFromELBS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = "${var.lambda_arn}"
  principal     = "s3.amazonaws.com"
  source_arn    = "${aws_s3_bucket.elb_log.arn}"
}

resource "aws_s3_bucket_notification" "cf_log" {
  bucket = "${aws_s3_bucket.cf_log.id}"

  lambda_function {
    lambda_function_arn = "${var.lambda_arn}"
    events              = ["s3:ObjectCreated:Put"]
  }
}

resource "aws_lambda_permission" "cf_log" {
  statement_id  = "AllowExecutionFromCFS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = "${var.lambda_arn}"
  principal     = "s3.amazonaws.com"
  source_arn    = "${aws_s3_bucket.cf_log.arn}"
}
