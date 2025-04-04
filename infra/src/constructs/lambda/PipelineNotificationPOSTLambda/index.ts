/* ---------------- External ---------------- */
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from 'path';

interface Props {
  env: string;
}

export class PipelineNotificationPOSTLambda extends Construct {
  readonly function: NodejsFunction;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.function = new NodejsFunction(this, `PipelineNotificationPOSTLambda-${props.env}`, {
      functionName: `pipeline-notification-post-lambda-${props.env.toLowerCase()}`,
      entry: join(__dirname, 'handler.ts'),
      runtime: Runtime.NODEJS_LATEST,
    });

    this.function.addToRolePolicy(
      new PolicyStatement({
        actions: ['ses:SendEmail'],
        effect: Effect.ALLOW,
        resources: ['*']
      })
    )
  }
}