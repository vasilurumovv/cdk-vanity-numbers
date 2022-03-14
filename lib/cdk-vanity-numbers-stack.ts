import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkVanityNumbersStack extends Stack {
  //TODO: replace with existing Amazon Connect Instance ARN
  private readonly callCenterARN = "AMAZON_CONNECT_INSTANCE_ARN";
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // define AWS DynamoDB table for vanity numbers
    const table = new dynamodb.Table(this, 'VanityNumbersTable', {
      partitionKey: { name: 'phoneNumber', type: dynamodb.AttributeType.STRING },
    });
    // define an AWS Lambda resource for create vanity numbers
    const generateVanityNumber = new lambda.Function(this, 'GenerateVanityNumberHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda/generateVanityNumber-1cced3a7-3838-46ee-9b10-969667cafd30.zip"),
      handler: 'index.handler',
      environment: {
        TABLE_NAME: table.tableName,
        MIN_WORD_LENGTH: '3',
        MAX_WORD_LENGTH: '12',
        VANITY_NUMBER_COUNT: '5',
        VANITY_NUMBER_MAX_WORD_COUNT: '1'
      }
    });
    generateVanityNumber.node.addDependency(table);

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(generateVanityNumber);

    //TO DO define Amazon Connect ContactFlow for generating vanity numbers
    
  }
}
