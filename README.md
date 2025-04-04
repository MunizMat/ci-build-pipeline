# Backend Challenge - CI Build Pipeline
This repository contains the solution for the CI Build Pipeline challenge from [this link](https://github.com/boilerlabs/backend-challenges/blob/main/challenges/junior/ci-build-pipeline.md). It defines a Github Actions workflow for building a Node.js REST API.

## Features
- Dependency Management: Stages to manage and cache dependencies to speed up the build process.
- Build Artifacts: Configure the pipeline to store build artifacts (e.g., JAR files, binaries) for later use.
- Notifications: Set up notifications to alert you of build results or failures.

## Pending Implementations
- Parallel Builds: Set up parallel builds to improve build times for larger projects.
- Versioning: Implement versioning strategies to tag build artifacts with version numbers or build IDs.