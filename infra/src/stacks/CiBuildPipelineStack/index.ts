/* -------------- External -------------- */
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

/* -------------- Constructs -------------- */
import { EmailServiceCIBuildBucket } from '../../constructs/s3/EmailServiceCIBuildBucket';
import { PipelineNotificationPOSTLambda } from '../../constructs/lambda/PipelineNotificationPOSTLambda';
import { EmailServiceNotificationsAPI } from '../../constructs/api-gateway/EmailServiceNotificationsAPI';

interface Props extends StackProps {
  environment: string;
}

export class CiBuildPipelineStack extends Stack {
  readonly emailServiceCiBuildBucket: EmailServiceCIBuildBucket;
  readonly pipelineNotificationPostLambda: PipelineNotificationPOSTLambda;
  readonly emailServiceNotificationsRestApi: EmailServiceNotificationsAPI;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const env = props.environment;

    this.emailServiceCiBuildBucket = new EmailServiceCIBuildBucket(this, `EmailServiceCIBuildBucket-${env}`, {
      env,
    });

    this.emailServiceNotificationsRestApi = new EmailServiceNotificationsAPI(this, `EmailServiceNotificationsAPI-${env}`, {
      env,
    });

    this.pipelineNotificationPostLambda = new PipelineNotificationPOSTLambda(this, `PipelineNotificationPOSTLambda-${env}`, {
      env,
    });

    const notificationsResource = this.emailServiceNotificationsRestApi.restApi.root.addResource('notifications');

    notificationsResource.addMethod('POST', new LambdaIntegration(this.pipelineNotificationPostLambda.function));
  }
}
