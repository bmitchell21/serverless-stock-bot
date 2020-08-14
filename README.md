# serverless-stock-bot

This is a SAM application that, when finished, returns the high, low, and open stock price for a specified company.

The application uses two way SMS using AWS Pinpoint, Lambda and SAM.  

The user must text the designated phone number in this format: "stock stocksymbol"

1. Sign in to the Pinpoint console
2. Use the us-east-1 region
3. create project
4. Configure SMS and voice
5. Enable the SMS channel
6. Setting --> voice --> number settings --> request long codes
7. Choose United States for the target country/region; Choose promotional for the default call type
8. Click all projects and take note of the Projecy ID.
9. Clone this repository
10. Create a bucket
11. Clone into the repository
12. Create a free account and take note of the token


# These are the commands to run in the cli
sam build

sam package --output-template-file packaged.yaml --s3-bucket YOUR BUCKET HERE

sam deploy --template-file packaged.yaml --stack-name myStockApp --capabilities CAPABILITY_IAM --region us-east-1 --parameter-overrides APIkey=YOUR API TOKEN ApplicationId=YOUR PROJECT ID

