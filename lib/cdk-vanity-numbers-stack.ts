import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as apigw from  'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CdkVanityNumbersStack extends Stack {
    //TODO: replace with existing Amazon Connect Instance ARN
  private readonly callCenterARN = "AMAZON_CONNECT_INSTANCE_ARN";
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
        // define AWS DynamoDB table for vanity numbers
    const table = new dynamodb.Table(this, 'VanityNumbersTable', {
      partitionKey: { name: 'phoneNumber', type: dynamodb.AttributeType.STRING },
    });
    
    const generateVanity = new lambda.Function(this, "GenerateVanityHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda/generateVanityNumber.zip"),
      handler: 'index.handler',
    });
     generateVanity.node.addDependency(table);
         // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(generateVanity);

    //TO DO define Amazon Connect ContactFlow for generating vanity numbers
    
    const api = new apigw.LambdaRestApi(this, 'cdk-vanity-numbers-api', {handler: generateVanity});
  }
}
