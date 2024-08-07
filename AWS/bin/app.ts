#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { DatabaseStack } from "../lib/database-stack";
import { EcsEcrStack } from "../lib/ecs-ecr-stack";
import { FrontendBucketStack } from "../lib/frontend-bucket-stack";
import { NetworkStack } from "../lib/network-stack";

const app = new cdk.App();

const networkStack = new NetworkStack(app, "Bao-Nguyen-Network-Stack");
const databaseStack = new DatabaseStack(app, "Bao-Nguyen-Database-Stack", {
  vpc: networkStack.vpc,
});
const ecsEcrStack = new EcsEcrStack(app, "Bao-Nguyen-EcsEcr-Stack", {
  vpc: networkStack.vpc,
  dbClusterEndpoint: databaseStack.dbCluster.clusterEndpoint.socketAddress,
  ecrImageArn:
    "arn:aws:ecr:eu-north-1:023133483587:repository/bao-nguyen-eurojackpot", // Don't know if this correct or not lol.
});

const frontendBucketStack = new FrontendBucketStack(
  app,
  "Bao-Nguyen-Frontend-Bucket-Stack"
);

cdk.Tags.of(app).add("Owner", "Bao Nguyen");

app.synth();
