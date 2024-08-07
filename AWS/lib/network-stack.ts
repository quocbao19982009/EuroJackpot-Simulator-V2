import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc; // Get vpc from outside of the stack

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Set up the new VPC
    this.vpc = new ec2.Vpc(this, "Bao-Nguyen-VPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
      maxAzs: 2,
      subnetConfiguration: [],
    });

    // Define the subnets
    const publicSubnet1 = new ec2.Subnet(this, "Bao-Nguyen-Public-Subnet-1", {
      vpcId: this.vpc.vpcId,
      availabilityZone: this.vpc.availabilityZones[0],
      cidrBlock: "10.0.1.0/24",
      mapPublicIpOnLaunch: true, // Because it's a public subnet so it will have a public IP
    });

    const publicSubnet2 = new ec2.Subnet(this, "Bao-Nguyen-Public-Subnet-2", {
      vpcId: this.vpc.vpcId,
      availabilityZone: this.vpc.availabilityZones[1],
      cidrBlock: "10.0.2.0/24",
      mapPublicIpOnLaunch: true,
    });

    const privateSubnet1 = new ec2.Subnet(this, "Bao-Nguyen-Private-Subnet-1", {
      vpcId: this.vpc.vpcId,
      availabilityZone: this.vpc.availabilityZones[0],
      cidrBlock: "10.0.3.0/24",
    });

    const privateSubnet2 = new ec2.Subnet(this, "Bao-Nguyen-Private-Subnet-2", {
      vpcId: this.vpc.vpcId,
      availabilityZone: this.vpc.availabilityZones[1],
      cidrBlock: "10.0.4.0/24",
    });

    const dbSubnet1 = new ec2.Subnet(this, "Bao-Nguyen-DB-Subnet-1", {
      vpcId: this.vpc.vpcId,
      availabilityZone: this.vpc.availabilityZones[0],
      cidrBlock: "10.0.5.0/24",
    });

    const dbSubnet2 = new ec2.Subnet(this, "Bao-Nguyen-DB-Subnet-2", {
      vpcId: this.vpc.vpcId,
      availabilityZone: this.vpc.availabilityZones[1],
      cidrBlock: "10.0.6.0/24",
    });

    // Create the internet gateway
    const internetGateway = new ec2.CfnInternetGateway(
      this,
      "Bao-Nguyen-InternetGateway",
      {
        tags: [
          { key: "Owner", value: "Bao-Nguyen" },
          { key: "Name", value: "Bao-Nguyen-InternetGateway" },
        ],
      }
    );

    // Attach the internet gateway to the VPC
    new ec2.CfnVPCGatewayAttachment(
      this,
      "Bao-Nguyen-InternetGatewayAttachment",
      {
        vpcId: this.vpc.vpcId,
        internetGatewayId: internetGateway.ref,
      }
    );

    // Create the route table
    const publicRouteTable = new ec2.CfnRouteTable(
      this,
      "Bao-Nguyen-Public-RouteTable",
      {
        vpcId: this.vpc.vpcId,
      }
    );

    // Config route table is public (Connect to internet) with the internet gateway
    new ec2.CfnRoute(this, "Bao-Nguyen-Route", {
      routeTableId: publicRouteTable.ref, // In AWS, ref is basically ID?
      destinationCidrBlock: "0.0.0.0/0", // 0.0.0.0/0 is the destination IP address, which means all connections will go to the internet
      gatewayId: internetGateway.ref, // The internet gateway
    });

    // Connect the public subnet to the route table
    new ec2.CfnSubnetRouteTableAssociation(
      this,
      "Bao-Nguyen-Public-Subnet-1-RouteTable",
      {
        subnetId: publicSubnet1.subnetId,
        routeTableId: publicRouteTable.ref,
      }
    );

    new ec2.CfnSubnetRouteTableAssociation(
      this,
      "Bao-Nguyen-Public-Subnet-2-RouteTable",
      {
        subnetId: publicSubnet2.subnetId,
        routeTableId: publicRouteTable.ref,
      }
    );

    // Create Nat Gateway (NAT Gateway is used to allow instances (in private subnet) to connect to the internet)
    const natGateway = new ec2.CfnNatGateway(this, "Bao-Nguyen-NatGateway", {
      subnetId: publicSubnet1.subnetId, // Nat gateway is created in the public subnet because it needs to connect to the internet. and the private subnet will connect to the nat gateway
      allocationId: new ec2.CfnEIP(this, "Bao-Nguyen-EIP").attrAllocationId, // EIP is elastic IP address (Which mean the IP address will not change). Normal IP address will change if the instance is stopped
    });

    // Create the routeTable for the private subnet
    const privateRouteTable1 = new ec2.CfnRouteTable(
      this,
      "Bao-Nguyen-Private-RouteTable-1",
      {
        vpcId: this.vpc.vpcId,
      }
    );

    // Q: Need to have better understanding of the route table
    new ec2.CfnRoute(this, "Bao-Nguyen-Private-Route-1", {
      routeTableId: privateRouteTable1.ref,
      destinationCidrBlock: "0.0.0.0/0", // This is the destination IP address, because it is 0.0.0.0/0, all connections will go to the nat gateway
      natGatewayId: natGateway.ref, // This the target. In this case, it is the nat gateway.
    });

    // Connect the private subnet to the route table
    new ec2.CfnSubnetRouteTableAssociation(
      this,
      "Bao-Nguyen-Private-Subnet-1-RouteTable",
      {
        subnetId: privateSubnet1.subnetId,
        routeTableId: privateRouteTable1.ref,
      }
    );

    const privateRouteTable2 = new ec2.CfnRouteTable(
      this,
      "Bao-Nguyen-Private-RouteTable-2",
      {
        vpcId: this.vpc.vpcId,
      }
    );

    new ec2.CfnRoute(this, "Bao-Nguyen-Private-Route-2", {
      routeTableId: privateRouteTable2.ref,
      destinationCidrBlock: "0.0.0.0/0",
      natGatewayId: natGateway.ref,
    });

    new ec2.CfnSubnetRouteTableAssociation(
      this,
      "Bao-Nguyen-Private-Subnet-2-RouteTable",
      {
        subnetId: privateSubnet2.subnetId,
        routeTableId: privateRouteTable2.ref,
      }
    );

    // Create the route table for the db subnet
    const dbRouteTable1 = new ec2.CfnRouteTable(
      this,
      "Bao-Nguyen-DB-RouteTable-1",
      {
        vpcId: this.vpc.vpcId,
      }
    );

    // Associate the db subnet to the route table
    // Q: Why Route table for DB subnet doesn't need to have a destination IP address?
    new ec2.CfnSubnetRouteTableAssociation(
      this,
      "Bao-Nguyen-DB-Subnet-1-RouteTable",
      {
        subnetId: dbSubnet1.subnetId,
        routeTableId: dbRouteTable1.ref,
      }
    );

    const dbRouteTable2 = new ec2.CfnRouteTable(
      this,
      "Bao-Nguyen-DB-RouteTable-2",
      {
        vpcId: this.vpc.vpcId,
      }
    );

    new ec2.CfnSubnetRouteTableAssociation(
      this,
      "Bao-Nguyen-DB-Subnet-2-RouteTable",
      {
        subnetId: dbSubnet2.subnetId,
        routeTableId: dbRouteTable2.ref,
      }
    );
  }
}

// SUMMARY STEP: + Set up the new VPC
//               + Define subnets (2 publics, 2 privates, 2 DBs)
//               + Create the internet gateway
//               + Attach the internet gateway to the VPC
//               + Create the route table for Public (Connect to internet) with the internet gateway
//               + Connect the public subnet to the route table
//               + Create Nat Gateway (Live in Public Subnet) (NAT Gateway is used to allow instances (in private subnet) to connect to the internet)
//               + Create the routeTable for the private subnet (Connect to Nat Gateway)
//               + Connect the private subnet to the route table
//               + Create the route table for the db subnet (No destination IP address)
//               + Associate the db subnet to the route table
