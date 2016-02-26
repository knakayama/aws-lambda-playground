# General
name              = "delete_snapshot"
region            = "ap-northeast-1"
atlas_token       = "REPLACE_IN_ATLAS"
atlas_username    = "REPLACE_IN_ATLAS"
atlas_environment = "REPLACE_IN_ATLAS"

# Network
vpc_cidr      = "172.16.0.0/16"
public_subnet = "172.16.0.0/24"
az            = "ap-northeast-1a"

# EC2
instance_ami_id = "ami-59bdb937"
instance_type   = "t2.micro"

# lambda
runtime            = "python2.7"
event_pattern      = "event_pattern.json"
assume_role_policy = "assume_role_policy.json"
policy             = "policy.json"
