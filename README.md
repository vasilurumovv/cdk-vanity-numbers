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
### Infrastructure
            - Database: AWS DynamoDB
            - Compute: AWS Lambda (Node 14.x)
            - API: AWS API Gateway
            - Code Deployment: CDK and Cloud Formation
          
            Code Base:
            - GitHub Repo: https://github.com/vasilurumovv/cdk-vanity-numbers
### Network Diagram
![NetworkDiagram](https://github.com/vasilurumovv/cdk-vanity-numbers/blob/6cbfc2bdd3ed3fc560aac09c8f8952b05ba6a248/photos/NetworkDiagram.png)

### DynamoDB Tables
Started by creating DynamoDB Table called "VanityNumbersTable" and set the primaryKey to be "phoneNumber".
Then I have created one dummy item which will reflect the structure of items that I will save in the database:

  ```
    {
        phoneNumber: "1 (214) 211-2879",
        date: "date",
        vanityNumbersList: ["List of vanity Numbers"]
    }
```

I configured the roles and policies to allow different actions related to the table.
For the test purposes only I have allowed almost all actions which is not the best idea for production.

### Lambda Functions
I created a total of 3 Lambda functions, while I played around. However the logic needed to do the exercise I implemened in one of them. I have played around with different methods, accessing the DynamoDB and consuming parameters within my functions.

The main Lambda function about generating vanity numbers I have created locally in my own IDE and continuesly pasted and tested in the AWS Lambda panel. 

I have implemented an algorithm for generating the best vanity numbers. The way I choose which are the best vanity numbers is by looking up into hardcoded list of words.

    - vanity-numbers-generator
        - Description: Creates and saves 5 vanity numbers related to the phoneNumber and returns the last best three vanity numbers dynamoDB table.
        
        If the phone number is already saved in the dynamoDB it only returns the vanity numbers generated for it.

If I had more time I would definetely split this function into multiple scripts.
### Amazon API Gateway / RestAPI
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
        "title": "VanityNumberModel",

        "type": "object",

        "properties": {
            "phoneNumber": { "type": "string" }
        }
    }

  ```
### Amazon Connect & Contact flows

Amazon connect is a completely new part of AWS to me. After watching few tutorials it was pretty straight forward to work with the Amazon Connect panel and create the contact flows. The challange in this case was to understand the options that Amazonn Connect give us and how to store and work with parameters and attributes. If I had more time I would divided the workflow into more dialogs and make it more detailed and user friendly.

#### Issue with claiming phone number in Amazon Connect

I had problem with claiming a phone number. For some reason I am not able to claim a number in Amazon Connect. Altough, I have no claimed numbers, Despite the fact that I have none phone numbers claimed, I constantly get feedback that I have reached the maximum of claimed numbers. For that reason I will hardcode the phoneNumber in my Lambda function until I contact support and fix that issue.

The Hard Coded Phone Number I have used for testing:

    ```
    1 (214) 211-2879
    ```

The three best generated vanity numbers returned:
    ```
        [

        "1 (214) 211-ATPZ",

        "1 (214) 211-ATQW",

        "1 (214) 211-BUSY"

        ]
    ```

Contact Flow Diagrams:
![Greeting Dialog](https://github.com/vasilurumovv/cdk-vanity-numbers/blob/1f6c4c08108869e72083521ff45a44d87747c6c1/photos/greetingDialog.png)
![OnBoarding Dialog](https://github.com/vasilurumovv/cdk-vanity-numbers/blob/1f6c4c08108869e72083521ff45a44d87747c6c1/photos/onBoardingDialog.png)

#### AWS Cloud Development Kit and Cloud Formation (CDK) 
The last things I played around with are the CDK, Cloud Formation and the IDE in AWS Cloud9 panel. I was able to create CDK project from the Cloud9 terminal and found it way easier and understandable then creating everything from AWS panel. This method reminded me of Code First approach in building DataBases (using .NET Core Framework for example).
### Retrospective

#### Final Thoughts
I have never dealed with AWS resources and I found this project very intriguing. Despite the fact that the project is not ready for production yet I can say that It was great learning experience, due to the many challenges that I have faced.

#### Project Constraints and what to Improve
The short time and the upcoming deadline made me put some constrains on the project in order to present a MVP. 
What I would like to improve:

- Currently the algorithm behind generating best vanity numbers transforms only the last 4 digits of the number into characters. There is great opportunity to improve the algorithm and transform and suggest vanity numbers including all the phone digits.

- The way I choose which are the best vanity numbers is by looking up into hardcoded list of words. To improve that we can later on use word dictionary plugin or get many words from other sources.

- I would definetely split the generating vanity numbers Lambda function into multiple scripts.

- Build the whole project by using the IDE in Cloud9 panel.

- Take into consideration roles, policies and permissions.

- Improve error handling for both the RestAPI and Contact flows.
#### Website
TBA

### Conclusion
Overall, I am happy with what I have done and I belive that I understood the fundamentals of different parts of AWS and the opportunities that it provides us with. If I have worked with AWS before I would probably start building the project using the IDE in Cloud9 panel from the early beggining.I was a bit disapointed about the issue with claiming phone number and I hope that I will be able to handle it after contacting the support. Another  I would like to try consuming the generating vanity numbers endpoint in real application and present the results.