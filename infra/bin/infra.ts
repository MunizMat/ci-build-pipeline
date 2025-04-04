#!/usr/bin/env node
/* --------------- External -------------- */
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

/* --------------- Stacks -------------- */
import { CiBuildPipelineStack } from '../src/stacks/CiBuildPipelineStack';

const app = new App();
const environment = process.env.ENVIRONMENT || '';

const stackName = `CiBuildPipelineStack-${environment}`;

new CiBuildPipelineStack(app, stackName, {
  stackName,
  environment,
});