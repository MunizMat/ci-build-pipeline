/* -------------- External -------------- */
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

/* -------------- Utils -------------- */
import { httpResponse } from '../../../utils/httpResponse';

/* -------------- Clients -------------- */
import { sesClient } from '../../../clients/ses';

/* -------------- Constants -------------- */
import { pipelineNotificationEmail } from '../../../constants/email-templates/pipeline-notification-email';

interface Body {
  branch: string;
  repository: string;
  userName: string;
  commit: {
    hash: string;
    message: string;
    url: string;
  };
  workflow: string;
  status: string;
  buildId: string;
  timestamp: string;
  duration: string;
}

const STATUS_LABELS: Record<string, string> = {
  success: 'succeeded',
  failure: 'failed',
  cancelled: 'cancelled',
  skipped: 'skipped',
};

const ENVIRONMENT_LABELS: Record<string, string> = {
  PROD: 'Production',
  STG: 'Staging',
};

export const handler: APIGatewayProxyHandlerV2 = async (
  event,
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    if (!event.body)
      return httpResponse({
        status: 400,
        body: { message: 'Request is missing required body' },
      });

    const {
      branch,
      commit,
      repository,
      status,
      userName,
      workflow,
      buildId,
      timestamp,
      duration,
    } = JSON.parse(event.body) as Body;

    const statusLabel = STATUS_LABELS[status] ?? 'failed';
    const environment = process.env.ENVIRONMENT || '';

    const environmentLabel = ENVIRONMENT_LABELS[environment];

    const params: SendEmailCommandInput = {
      Source: 'noreply@resume-refine.com',
      Destination: {
        ToAddresses: ['matheusmuniz215@gmail.com'],
      },
      Message: {
        Body: {
          Html: {
            Data: pipelineNotificationEmail({
              branch,
              commit: {
                hash: commit.hash,
                message: commit.message,
                url: commit.url,
              },
              pipelineUrl: `https://github.com/${repository}/actions/runs/${buildId}`,
              workflow,
              repository,
              status,
              userName,
              timestamp,
              duration,
              environment: environmentLabel,
            }),
          },
        },
        Subject: {
          Data: `${environment} CI build ${statusLabel} on ${repository} (${commit.message})`,
        },
      },
    };

    await sesClient.send(new SendEmailCommand(params));

    return httpResponse({
      body: { message: 'OK' },
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return httpResponse({
      body: { message: 'Internal server error' },
      status: 500,
    });
  }
};
