variable "name"                { }
variable "vpc_id"              { }
variable "key_name"            { }
variable "public_subnet_id"    { }
variable "ec2_instance_type"   { }
variable "ec2_instance_ami_id" { }

module "web" {
  source = "./web"

  name             = "${var.name}-web"
  vpc_id           = "${var.vpc_id}"
  key_name         = "${var.key_name}"
  public_subnet_id = "${var.public_subnet_id}"
  instance_type    = "${var.ec2_instance_type}"
  instance_ami_id  = "${var.ec2_instance_ami_id}"
}

output "ec2_public_ip"   { value = "${module.web.public_ip}" }
output "ec2_instance_id" { value = "${module.web.instance_id}" }
