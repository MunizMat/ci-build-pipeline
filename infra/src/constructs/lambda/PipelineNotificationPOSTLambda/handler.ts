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


export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    console.log('EVENT: ', event);

    const params: SendEmailCommandInput = {
      Source: 'noreply@resume-refine.com',
      Destination: {
        ToAddresses: ['matheusmuniz215@gmail.com']
      },
      Message: {
        Body: {
          Html: {
            Data: pipelineNotificationEmail({
              branch: 'test',
              commit: {
                hash: 'test',
                message: 'test',
                url: 'https://github.com',
              },
              duration: '30s',
              pipelineName: 'Pipeline',
              repository: 'Repo',
              status: 'success',
              timestamp: 'now',
              userName: 'Muniz'
            })
          },
        },
        Subject: {
          Data: 'Pipeline build'
        }
      }
    };

    await sesClient.send(new SendEmailCommand(params))

    return httpResponse({
      body: { message: 'OK' },
      status: 200
    });
  } catch (error) {
    console.error(error);

    return httpResponse({
      body: { message: 'Internal server error' },
      status: 500
    });
  }
}