terraform {
  backend "s3" {
    bucket  = "clothes-manager-terraform-backend"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = "us-east-1"
}