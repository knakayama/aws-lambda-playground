resource "random_id" "s3" {
  byte_length = 8

  keepers = {
    name = "${var.name}"
  }
}

data "aws_iam_policy_document" "s3" {
  statement {
    sid    = "AddPerm"
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${random_id.s3.hex}/*",
    ]

    principals = {
      type = "AWS"

      identifiers = [
        "*",
      ]
    }
  }
}

resource "aws_s3_bucket" "s3" {
  bucket        = "${random_id.s3.hex}"
  acl           = "public-read"
  policy        = "${data.aws_iam_policy_document.s3.json}"
  force_destroy = true

  website {
    index_document = "${var.s3_config["index"]}"
  }
}

resource "aws_s3_bucket_object" "s3" {
  bucket       = "${aws_s3_bucket.s3.id}"
  key          = "index.html"
  source       = "${path.module}/objects/index.html"
  content_type = "text/html"
}
