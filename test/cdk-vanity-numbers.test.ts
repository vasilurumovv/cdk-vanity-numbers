import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as CdkVanityNumbers from '../lib/cdk-vanity-numbers-stack';

test('Lambda Functions Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkVanityNumbers.CdkVanityNumbersStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::SNS::Topic', 1);
});
