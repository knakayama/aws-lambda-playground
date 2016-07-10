resource "aws_iam_role" "lambda_function" {
  name = "modify-spot-fleet-request-role"

  assume_role_policy = <<EOT
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOT
}

resource "aws_iam_policy_attachment" "cloudwatch_full_access" {
  name       = "CloudWatchFullAccess"
  roles      = ["${aws_iam_role.lambda_function.name}"]
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchFullAccess"
}

resource "aws_iam_role_policy" "lambda_function" {
  name = "ModifySpotFleetRequest"
  role = "${aws_iam_role.lambda_function.id}"

  policy = <<EOT
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ModifySpotFleetRequest",
      "Action": [
        "ec2:DescribeSpotFleetRequests",
        "ec2:ModifySpotFleetRequest"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOT
}
