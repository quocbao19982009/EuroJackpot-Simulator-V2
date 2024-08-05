import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as rds from "aws-cdk-lib/aws-rds";
import * as S3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

const ecrImageName = "Bao-Nguyen-Image-name";
const ecrImageId = "Bao-Nguyen-ID-Image";

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Bao-Nguyen-VPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
      maxAzs: 2, // Default, it will create 2 AZs
      subnetConfiguration: [
        {
          cidrMask: 24, // Number of bits in the CIDR mask aka the number of IP address will be available in the subnet
          name: "Bao-Nguyen-Public-Subnet",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Bao-Nguyen-Private-Subnet",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, // This subnet will have a NAT Gateway aka internet connection
        },
        {
          cidrMask: 24,
          name: "Bao-Nguyen-DB-Subnet",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // This subnet will not have a NAT Gateway aka no internet connection
        },
      ],
    });

    // Create tag for VPC and all subnets
    cdk.Tags.of(vpc).add("Owner", "Bao-Nguyen");
    vpc.publicSubnets.forEach((subnet) => {
      cdk.Tags.of(subnet).add("Owner", `Bao-Nguyen`);
    });
    vpc.privateSubnets.forEach((subnet) => {
      cdk.Tags.of(subnet).add("Owner", `Bao-Nguyen`);
    });
    vpc.isolatedSubnets.forEach((subnet) => {
      cdk.Tags.of(subnet).add("Owner", `Bao-Nguyen`);
    });

    // S3 Bucket for website hosting

    // This part create a new public S3 bucket for website hosting, will remove if the stack is deleted
    // Q: How to push the website content to the bucket?
    // Q: If the bucket is already exits, how to use it?
    const websiteBucket = new S3.Bucket(this, "bao-nguyen-website-bucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: true,
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, "Bao-Nguyen-Cluster", {
      vpc: vpc,
    });

    // get image from ECR
    // Q: How to push the image to ECR?
    const repo = ecr.Repository.fromRepositoryName(
      this,
      ecrImageId,
      ecrImageName
    );

    // Task Definition for .NET App
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "Bao-Nguyen-Task-Definition"
    );

    const container = taskDefinition.addContainer("Bao-Nguyen-API-Backend", {
      image: ecs.ContainerImage.fromEcrRepository(repo),
      memoryLimitMiB: 512,
      cpu: 256,
      environment: {
        ASPNETCORE_ENVIRONMENT: "Production",
        ConnectionStrings__DefaultConnection:
          "DB_CONNECTION_STRING_PLACEHOLDER", // This is a placeholder for the connection string
        // Q: How to replace this
      },
    });

    container.addPortMappings({
      containerPort: 80, // Check the image need to expose port 80 as well
    });

    // Fargate Service.
    // Q: What is ecs_patterns? What is this used for?
    const fargateService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        "Bao-Nguyen-Service",
        {
          cluster: cluster,
          taskDefinition: taskDefinition,
          desiredCount: 1,
          publicLoadBalancer: false, // I understand this setting to set ALB to private, meaning only the webtier can access this. Should this change to Public?
          vpc: vpc,
        }
      );

    // Aurora MySQL Database
    // Q: I understand that Cluster mean  Group. Is this correct?
    const dbCluster = new rds.DatabaseCluster(
      this,
      "Bao-Nguyen-DB-Cluster-MySQL-Aurora",
      {
        engine: rds.DatabaseClusterEngine.auroraMysql({
          version: rds.AuroraMysqlEngineVersion.VER_2_11_1,
        }), // Define the version of Aurora MySQL
        writer: rds.ClusterInstance.provisioned("writer", {
          instanceType: ec2.InstanceType.of(
            ec2.InstanceClass.BURSTABLE2,
            ec2.InstanceSize.MICRO
          ),
        }),
        vpc: vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          subnets: vpc.isolatedSubnets, // Q: This state that the DB will be in the isolated subnet in the VPC. Is this correct?
        },
        defaultDatabaseName: "BaoNguyenDB",
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    // Grant ECS Task  role access to the DB
    dbCluster.grantDataApiAccess(fargateService.taskDefinition.taskRole);

    // Set DB connection String
    container.addEnvironment(
      "ConnectionStrings__DefaultConnection",
      dbCluster.clusterEndpoint.socketAddress
    );

    new cdk.CfnOutput(this, "WebsiteURL", {
      value: websiteBucket.bucketWebsiteUrl,
    });
  }
}

const app = new cdk.App();
new AwsStack(app, "Bao-Nguyen-VPC");
app.synth();

// Step missing from the Stack:
// 1. Build FE and push to S3
// 2. Create an ECR repository
// 3. Push the image to ECR
