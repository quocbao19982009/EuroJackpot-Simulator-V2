import * as cdk from "aws-cdk-lib";
import * as S3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class FrontendBucketStack extends cdk.Stack {
  public readonly websiteBucket: S3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.websiteBucket = new S3.Bucket(this, "bao-nguyen-webstie-bucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: true,
      blockPublicAccess: S3.BlockPublicAccess.BLOCK_ACLS,
      autoDeleteObjects: true,
    });

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("./../../API/wwwroot")], // how to make this path relative?
      destinationBucket: this.websiteBucket,
    });

    new cdk.CfnOutput(this, "WebsiteURL", {
      value: this.websiteBucket.bucketWebsiteUrl,
    });
  }
}
