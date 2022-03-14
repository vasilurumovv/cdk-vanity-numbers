 import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkVanityNumbers from '../lib/cdk-vanity-numbers-stack';

test('Lambda Functions Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkVanityNumbers.CdkVanityNumbersStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::Lambda::Function", 2);
});

test('Contact Flow Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkVanityNumbers.CdkVanityNumbersStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::Connect::ContactFlow", 1);
});
