# Project Requirements
## Voice foundry Development Project

We expect you to build this out as you would a production project for a client, only on a small scale (tests, error handling, etc). Where you don't have the time to implement something, add comments to your code or documentation on how you would have changed or added to your implementation in the "real world".

Deliverables
	•	Git Repo with all code and documentation

	•	BONUS - a working Amazon Connect phone number to test in your environment :-)
    Exercise

	•	Create a Lambda that converts phone numbers to vanity numbers and save the best 5 resulting vanity numbers and the caller's number in a DynamoDB table. "Best" is defined as you see fit - explain your thoughts.

	•	Create an Amazon Connect contact flow that looks at the caller's phone number and says the 3 vanity possiblities that come back from the Lambda function.

	•	Create a custom resource for CloudFormation] that will allow you to publish the contact flow to a Connect instance with the appropriate Lambda ARN already in the contact flow so that there is no manual configuration of the flow.

	•	Build a deployment package with AWS SAM, AWS CDK, or CloudFormation to allow a user, or assignment reviewer, to deploy your Lambda, custom resource, and anything else you'd like to add into their own AWS Account/Amazon Connect instance.

	•	SUPER BONUS - a web app that displays the vanity numbers from the last 5 callers.

	•	Writing and Documentation

	•	Record your reasons for implementing the solution the way you did, struggles you faced and problems you overcame.

	•	What shortcuts did you take that would be a bad practice in production?

	•	What would you have done with more time? We know you have a life. :-)

	•	What other considerations would you make before making our toy app into something that would be ready for high volumes of traffic, potential attacks from bad folks, etc.

	•	Please include an architecture diagram.
# Project Documentation
### Network Diagram
![NetworkDiagram](TO BE ADDED )

### Amazon API Gateway
- voiceFoundry-VanityNumbers
    - !Important: This API Gateway was quickly thrown together, and I am well aware that it contains many security flaws that should never be in production!
    - API is set up with cors to work with external sources.
    - Deployment Stage: Dev
        - Base URL: https://0zv4m6zpze.execute-api.us-east-1.amazonaws.com/dev
    - /Methods
        - GET()
            - Description: Executes the VanityNumbersAPI-vanity-numbers Lambda Function
            - URL Query String Parameters: phoneNumber
                - phoneNumber [the number that will be used to query the results database table.]
        - POST()
            - Description: Executes the VanityNumbersAPI-vanity-numbers-generator Lambda Function.
            - body Model: application/json

                ```
                {
                    "type":"object",
                    "properties" : {
                        "phoneNumber": {"type": "string"}
                    },
                    "title": "Input"
                }
                ```
            
          
### Website
            Infrastructure: 
            - Code Deployment: AWS S3 bucket
            - API: AWS API Gateway
            - Compute: AWS Lambda (Node 14.x)
            - Database: AWS DynamoDB

            Code Base:
            - GitHub Repo: https://github.com/vasilurumovv/cdk-vanity-numbers
### Lambda Functions
    - VanityNumbersAPI-vanity-numbers-generator
        - Description: Creates and saves 5 vanity numbers related to the phoneNumber and returns the last best three vanity numbers dynamoDB table. If the numbers is already saved in the dynamoDB it only returns the vanityNumbers generated.
### DynamoDB Tables

### Amazon Connect & Contact flows

Amazon connect is a completely new part of AWS to me. After watching few tutorials it was pretty straight forward to create the contact flows, however I had problem with claiming a phone number. Despite the fact that I have none phone numbers claimed, I constantly get that I have exceeded the number of phone numbers. The challanges here we to understand the options that Amazonn Connect give us and how to store and work with parameters and attributes. If I had more time I would divided the workflow into more dialogs and make it more detailed and user friendly.

- Issue with Amazon Connect phone Number: For some reason I am not able to claim a number in Amazon Connect. I have no claimed numbers and I receive as a feedback that I have reached the maximum of claimed numbers. For that reason I will hardcode the phoneNumber until I contact support and fix that isse.

1 (214) 211-2879 / 1 (214) 211-BUSY.

- [Contact Flow Diagrams]
- ![Greeting Dialog](https://github.com/vasilurumovv/cdk-vanity-numbers/blob/1f6c4c08108869e72083521ff45a44d87747c6c1/photos/greetingDialog.png)
- (![OnBoarding Dialog](https://github.com/vasilurumovv/cdk-vanity-numbers/blob/1f6c4c08108869e72083521ff45a44d87747c6c1/photos/onBoardingDialog.png))

### Retrospective

#### Final Thoughts
I have never dealed with AWS resources and I found this project very intriguing. Despite the fact that the project is not ready for production yet I can say that was great learning experience, due to the many challenges that I faced.

#### Project Constraints
The short time and the upcoming deadline made me put some constrains on the project in order to present an MVP. One of them is the algorithm behind generating best vanity numbers. So far I developed it to suggest an vanity number transfering only the last 4 digits of the number into characters. The way I choose which are the best vanity numbers is by looking up into hardcoded list of words. To improve that we can later on use word dictionary plugin or get many words from other sources.
    
#### The Data
As per project description I used DynamoDb for saving the data. VanityNumbersTable had been createtd
  
#### Lambda
I created a total of 3 Lambda functions, while I played around. However the logic needed to do the exercise I implemened in one of them. I would definetely split this function into multiple scripts.
- VanityNumbersAPI-vanity-numbers-generator
	- Description: Creates and saves 5 vanity numbers related to the phoneNumber and returns the last best three vanity numbers dynamoDB table. If the numbers is already saved in the dynamoDB it only returns the best three vanityNumbers generated.

If I had more time I would definetely spend it on improving the vanity numbers generator. In this solution I simply format the phoneNumber entered and suggest a vanity numbers by transforming only the last 4 digits of a numbers.

#### Website
TBA

#### Conclusion
Overall, I am happy with what I have done and I belive that I understood the fundamentals of different parts of AWS and the opportunities that it provides us with. I was a bit disapointed about the issue with claiming phone number and I hope that I will be able to handle it after contacting the support. I would also like to try consuming the generating vanity numbers endpoint in real application and present the results.