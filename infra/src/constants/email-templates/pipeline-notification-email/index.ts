/* ---------------- Utils ----------------- */
import { capitalize } from '../../../utils/capitalize';

/* ---------------- Interfaces ----------------- */
interface PipelineNotificationEmailInput {
  status: string;
  userName: string;
  repository: string;
  branch: string;
  commit: {
    url: string;
    hash: string;
    message: string;
  };
  workflow: string;
  duration: string;
  timestamp: string;
}

export const pipelineNotificationEmail = ({
  status,
  userName,
  repository,
  branch,
  commit,
  workflow,
  duration,
  timestamp,
}: PipelineNotificationEmailInput) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Build Pipeline Notification</title>
    <style>
        /* Base styles */
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 20px;
            background: #1a73e8;
            color: white;
            text-align: center;
        }
        .content {
            padding: 25px;
        }
        .status-card {
            border-left: 4px solid;
            padding: 15px;
            margin: 20px 0;
            background: #f9f9f9;
        }
        .success {
            border-color: #34a853;
        }
        .failure {
            border-color: #ea4335;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 15px 0;
            background: #1a73e8;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .footer {
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            background: #f5f5f5;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Build Pipeline Notification</h1>
        </div>
        
        <div class="content">
            <p>Hello ${userName},</p>
            
            <p>Your build pipeline has completed with the following status:</p>
            
            <!-- Dynamic status card -->
            <div class="status-card ${status ?? 'success'}">
                <h2 style="margin-top: 0;">${workflow} - ${capitalize(
  status || 'success',
)}</h2>
                <p><strong>Timestamp:</strong> ${timestamp}</p>
                <p><strong>Duration:</strong> ${duration}</p>
            </div>
            
            <div class="info-item">
                <strong>Repository:</strong> ${repository} (Branch: ${branch})
            </div>
            <div class="info-item">
                <strong>Commit:</strong> <a href="${commit.url}">${
  commit.hash
}</a> - ${commit.message}
            </div>
            
            <p>If you did not initiate this build or believe this is an error, please contact your DevOps team.</p>
            
            <p>Best regards,<br>DevOps Team</p>
        </div>
    </div>
</body>
</html>
`;
