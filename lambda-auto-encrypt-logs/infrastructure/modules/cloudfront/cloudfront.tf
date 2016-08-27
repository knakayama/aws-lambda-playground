resource "aws_cloudfront_distribution" "cf" {
  enabled          = true
  comment          = "${var.name}-cf"
  price_class      = "${var.cf_config["price_class"]}"
  retain_on_delete = true

  origin {
    domain_name = "${var.elb_dns_name}"
    origin_id   = "ELB-${var.elb_dns_name}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2", "SSLv3"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "ELB-${var.elb_dns_name}"

    forwarded_values {
      query_string = true
      headers      = ["*"]

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  logging_config {
    bucket          = "${var.cf_s3_bucket}.s3.amazonaws.com"
    include_cookies = true
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
