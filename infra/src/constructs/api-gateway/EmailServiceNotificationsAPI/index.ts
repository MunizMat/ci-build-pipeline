/* ----------------- External ------------------ */
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface Props {
  env: string;
}

export class EmailServiceNotificationsAPI extends Construct {
  readonly restApi: RestApi;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.restApi = new RestApi(this, `EmailServiceNotificationsRestAPI-${props.env}`, {
      restApiName: `email-service-notifications-rest-api-${props.env.toLowerCase()}`
    });
  }
}