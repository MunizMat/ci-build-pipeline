/* ----------------- External ----------------- */
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface Props {
  env: string;
}

export class EmailServiceCIBuildBucket extends Construct {
  readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.bucket = new Bucket(this, `EmailServiceCIBuildBucket-${props.env}`, {
      bucketName: `email-service-ci-build-bucket-${props.env.toLowerCase()}`,
      removalPolicy: RemovalPolicy.DESTROY,
      lifecycleRules: [
        {
          prefix: '/builds',
          expiration: Duration.days(3),
        },
      ],
    });
  }
}
