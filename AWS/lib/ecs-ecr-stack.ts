import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";

interface EcsEcrStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  dbClusterEndpoint: string;
  ecrImageArn: string;
}

export class EcsEcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcsEcrStackProps) {
    super(scope, id, props);

    // Create ECS cluster
    const cluster = new ecs.Cluster(this, "Bao-Nguyen-Cluster", {
      vpc: props.vpc,
    });

    // Get the ECR repository
    // Q: Repo mean the place where the Images is stored?
    const repo = ecr.Repository.fromRepositoryArn(
      this,
      "Bao-Nguyen-ECR-Repo",
      props.ecrImageArn
    );

    // Define the Fargate task
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "Bao-Nguyen-TaskDef"
    );

    // Add container to the task definition
    // So it would go ECS -> Task Definition -> Container
    const container = taskDefinition.addContainer("Bao-Nguyen-API-Backend", {
      image: ecs.ContainerImage.fromEcrRepository(repo), // Get the image from the ECR repository, but how it knows which image to get?,
      memoryLimitMiB: 512,
      cpu: 256,
      environment: {
        ASPNETCORE_ENVIRONMENT: "Production",
        ConnectionStrings__DefaultConnection: props.dbClusterEndpoint,
      },
    });

    container.addPortMappings({
      containerPort: 80, // This mean the docker container (Which is the dotnet app) will listen on port 80
    });

    // Create an Application load balanced
    const lb = new elbv2.ApplicationLoadBalancer(this, "Bao-Nguyen-ALB", {
      vpc: props.vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("Listener", {
      port: 80,
      open: true,
    });

    const service = new ecs.FargateService(this, "Bao-Nguyen-Service", {
      cluster,
      taskDefinition,
      desiredCount: 1,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }, // Should the service in Public or Private subnet?
      assignPublicIp: false,
    });

    // add the ECS service as a target to the ALB
    listener.addTargets("Bao-Nguyen-ECS", {
      port: 80,
      targets: [service],
      healthCheck: {
        path: "/health",
        interval: cdk.Duration.seconds(60),
      },
    });

    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: lb.loadBalancerDnsName,
    });
  }
}

// SUMMARY: + Create ECS Cluster
//          + Get ECR Repository
//          + Define Fargate Task
//          + Add Container to Task Definition
//          + Create Application Load Balancer
//          + Create ECS Service
//          + Add ECS Service as target to ALB
//          + Create Output for Load Balancer DNS
