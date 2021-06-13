resource "aws_vpc" "b_plus_vpc" {
  cidr_block = "10.0.0.0/16"
  instance_tenancy = "default"


  tags = {
    Name = "b_plus_vpc"
  }

}
