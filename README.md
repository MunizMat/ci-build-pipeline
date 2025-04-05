# Backend Challenge - CI Build Pipeline
This repository contains the solution for the CI Build Pipeline challenge from [this link](https://github.com/boilerlabs/backend-challenges/blob/main/challenges/junior/ci-build-pipeline.md). It defines a Github Actions workflow for building a Node.js REST API.
- **/api**: contains the source code for a email service API
- **/infra**: contains the infrastructure and resources used by the workflow, such as the S3 bucket and the REST endpoint for notifications

## Features
- Dependency management and caching with the node-setup action to speed the build time.
- Build artifact managment: The pipeline's workflow is configured to upload the build output to a bucket in AWS S3. 
- Notifications: After the build process the pipeline sends details of the build to a REST endpoint responsible for notifying consumers. The endpoint is currently configured to only send an email with the details of the pipeline execution, but it could easily be configured to send notifications to different destinations

![Captura de tela 2025-04-04 211456](https://github.com/user-attachments/assets/2f61e589-b8b9-4ca7-9a0a-506134c82ae0)
