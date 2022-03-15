#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkVanityNumbersStack } from '../lib/cdk-vanity-numbers-stack';

const app = new cdk.App();
new CdkVanityNumbersStack(app, 'CdkVanityNumbersStack');
