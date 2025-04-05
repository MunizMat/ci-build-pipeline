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
  pipelineUrl: string;
  environment: string;
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
  pipelineUrl,
  environment,
}: PipelineNotificationEmailInput) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Build Pipeline Notification - ${environment}</title>
    <style>
        /* Base styles */
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-size: 16px; 
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
            padding: 25px; 
            color: white;
            text-align: center;
            font-size: 18px; /* Larger font */
        }
        .header.success {
            background: #34a853; 
        }
        .header.failure {
            background: #ea4335; 
        }
        .content {
            padding: 30px; /* More spacious */
            font-size: 16px; /* Increased from 14px */
        }
        .status-card {
            border-left: 5px solid; /* Thicker border */
            padding: 20px; /* More padding */
            margin: 25px 0; /* More spacing */
            background: #f9f9f9;
            font-size: 16px;
        }
        .success {
            border-color: #34a853;
        }
        .failure {
            border-color: #ea4335;
        }
        .info-item {
            margin-bottom: 15px; /* More spacing */
            font-size: 16px;
        }
        h1 {
            font-size: 24px; /* Larger heading */
            margin: 0;
        }
        h2 {
            font-size: 20px; /* Larger subheading */
            margin-top: 0;
        }
        .button {
            display: inline-block;
            padding: 14px 28px; /* Larger button */
            background: #f9f9f9;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px; /* Larger button text */
        }
        .success .button {
            background: #34a853;
        }
        .failure .button {
            background: #ea4335;
        }
        .footer {
            padding: 20px; /* More padding */
            text-align: center;
            font-size: 14px; /* Slightly larger footer */
            color: #777777;
            background: #f5f5f5;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Dynamic header color based on status -->
        <div class="header ${status ?? 'success'}">
            <h1>Build Pipeline Notification</h1>
        </div>
        
        <div class="content">
            <p>Hello ${userName},</p>
            
            <p>Your build pipeline has completed with the following status:</p>
            
            <!-- Dynamic status card -->
            <div class="status-card ${status ?? 'success'}">
                <h2>${workflow} - ${capitalize(status || 'success')}</h2>
                <p><strong>Timestamp:</strong> ${timestamp}</p>
                <p><strong>Duration:</strong> ${duration}s</p>
            </div>
            
            <div class="info-item">
                <strong>Repository:</strong> <a href="https://github.com/${repository}" style="text-decoration:none;color:#f36319">${repository}</a>
            </div>
            <div class="info-item">
                <strong>Branch:</strong> ${branch}
            </div>
            <div class="info-item">
                <strong>Commit:</strong> ${
                  commit.message
                } (<a style="text-decoration:none;color:#f36319" href="${
  commit.url
}">#${commit.hash.slice(0, 10)}</a>)
            </div>
            
            <a href="${pipelineUrl}" class="button ${status ?? 'success'}">
                View Pipeline Details
            </a>
        </div>
        
        <div class="footer">
            © ${new Date().getFullYear()}. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
