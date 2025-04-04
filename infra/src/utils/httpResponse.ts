/* ------------------- External ------------------- */
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";

interface HttpResponseInput {
  body: Record<string, unknown>;
  status: number;
}

export const httpResponse = ({ body, status }: HttpResponseInput): APIGatewayProxyStructuredResultV2 => ({
  body: JSON.stringify(body),
  statusCode: status,
})