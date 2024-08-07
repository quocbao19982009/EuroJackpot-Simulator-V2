// import * as cdk from "aws-cdk-lib";
// import * as ec2 from "aws-cdk-lib/aws-ec2";
// import * as ecr from "aws-cdk-lib/aws-ecr";
// import * as ecs from "aws-cdk-lib/aws-ecs";
// import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
// import * as rds from "aws-cdk-lib/aws-rds";
// import * as S3 from "aws-cdk-lib/aws-s3";
// import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
// import { Construct } from "constructs";

// const ecrImageArn =
//   "arn:aws:ecr:eu-north-1:023133483587:repository/bao-nguyen-eurojackpot";
// export class AwsStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     const vpc = new ec2.Vpc(this, "Bao-Nguyen-VPC", {
//       ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
//       maxAzs: 2, // Default, it will create 2 AZs
//       subnetConfiguration: [
//         {
//           cidrMask: 24, // Number of bits in the CIDR mask aka the number of IP address will be available in the subnet
//           name: "Bao-Nguyen-Public-Subnet",
//           subnetType: ec2.SubnetType.PUBLIC,
//         },
//         {
//           cidrMask: 24,
//           name: "Bao-Nguyen-Private-Subnet",
//           subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, // This subnet will have a NAT Gateway aka internet connection
//         },
//         {
//           cidrMask: 24,
//           name: "Bao-Nguyen-DB-Subnet",
//           subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // This subnet will not have a NAT Gateway aka no internet connection
//         },
//       ],
//     });

//     // S3 Bucket for website hosting

//     // This part create a new public S3 bucket for website hosting, will remove if the stack is deleted
//     // Q: How to push the website content to the bucket?
//     // Q: If the bucket is already exits, how to use it?
//     const websiteBucket = new S3.Bucket(this, "bao-nguyen-website-bucket", {
//       websiteIndexDocument: "index.html",
//       publicReadAccess: true,
//       removalPolicy: cdk.RemovalPolicy.DESTROY,
//       versioned: true,
//       blockPublicAccess: S3.BlockPublicAccess.BLOCK_ACLS, // Allows public read access
//       autoDeleteObjects: true,
//     });

//     new s3deploy.BucketDeployment(this, "DeployWebsite", {
//       sources: [s3deploy.Source.asset("../API/wwwroot")],
//       destinationBucket: websiteBucket,
//     });

//     // ECS Cluster
//     const cluster = new ecs.Cluster(this, "Bao-Nguyen-Cluster", {
//       vpc: vpc,
//     });

//     // get image from ECR
//     // Q: How to push the image to ECR?
//     const repo = ecr.Repository.fromRepositoryArn(
//       this,
//       "Bao-Nguyen-Repo",
//       ecrImageArn
//     );

//     // Task Definition for .NET App
//     const taskDefinition = new ecs.FargateTaskDefinition(
//       this,
//       "Bao-Nguyen-Task-Definition"
//     );

//     const container = taskDefinition.addContainer("Bao-Nguyen-API-Backend", {
//       image: ecs.ContainerImage.fromEcrRepository(repo),
//       memoryLimitMiB: 512,
//       cpu: 256,
//       environment: {
//         ASPNETCORE_ENVIRONMENT: "Production",
//         ConnectionStrings__DefaultConnection:
//           "DB_CONNECTION_STRING_PLACEHOLDER", // This is a placeholder for the connection string
//         // Q: How to replace this
//       },
//     });

//     container.addPortMappings({
//       containerPort: 80, // Check the image need to expose port 80 as well
//     });

//     // Fargate Service.
//     // Q: What is ecs_patterns? What is this used for?
//     const fargateService =
//       new ecs_patterns.ApplicationLoadBalancedFargateService(
//         this,
//         "Bao-Nguyen-Service",
//         {
//           cluster: cluster,
//           taskDefinition: taskDefinition,
//           desiredCount: 1,
//           publicLoadBalancer: false, // I understand this setting to set ALB to private, meaning only the webtier can access this. Should this change to Public?
//         }
//       );

//     // Aurora MySQL Database
//     // Q: I understand that Cluster mean  Group. Is this correct?
//     const dbCluster = new rds.DatabaseCluster(
//       this,
//       "Bao-Nguyen-DB-Cluster-MySQL-Aurora",
//       {
//         engine: rds.DatabaseClusterEngine.auroraMysql({
//           version: rds.AuroraMysqlEngineVersion.VER_2_11_1,
//         }), // Define the version of Aurora MySQL
//         writer: rds.ClusterInstance.provisioned("writer", {
//           instanceType: ec2.InstanceType.of(
//             ec2.InstanceClass.BURSTABLE3,
//             ec2.InstanceSize.MEDIUM
//           ), // Q: How to define the instance type? Like how to know what is the compatible instance type for the DB?
//         }),
//         vpc: vpc,
//         vpcSubnets: {
//           subnets: vpc.isolatedSubnets, // Q: This state that the DB will be in the isolated subnet in the VPC. Is this correct?
//         },
//         defaultDatabaseName: "BaoNguyenDB",
//         removalPolicy: cdk.RemovalPolicy.DESTROY,
//       }
//     );

//     // Grant ECS Task  role access to the DB
//     dbCluster.grantDataApiAccess(fargateService.taskDefinition.taskRole);

//     // Set DB connection String
//     container.addEnvironment(
//       "ConnectionStrings__DefaultConnection",
//       dbCluster.clusterEndpoint.socketAddress
//     );

//     new cdk.CfnOutput(this, "WebsiteURL", {
//       value: websiteBucket.bucketWebsiteUrl,
//     });

//     cdk.Tags.of(this).add("Owner", "Bao-Nguyen");
//   }
// }
