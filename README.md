# serverless-stock-bot

This is a SAM application that returns the most recently available high, low, and open stock price for a specified company. 

The user must text the designated phone number in this format: "stock stocksymbol"

1. Sign in to the Pinpoint console
2. Use the us-east-1 region
3. Create project
4. Configure SMS and voice
5. Enable the SMS channel
6. Setting --> voice --> number settings --> request long codes
7. Choose United States for the target country/region; Choose promotional for the default call type
8. Click all projects and take note of the Project ID for this project.
9. Clone this repository
10. Create an S3 bucket 
      aws s3 mb s3://your-bucket-name
11. Clone this repository. CD into the repository
12. Create a free API tiingo account and take note of the API token



# These are the commands to run in the cli
sam build

sam package --output-template-file packaged.yaml --s3-bucket YOUR BUCKET HERE

sam deploy --template-file packaged.yaml --stack-name myStockApp --capabilities CAPABILITY_IAM --region us-east-1 --parameter-overrides APIkey=YOUR API TOKEN ApplicationId=YOUR PROJECT ID

# Remaining steps

13. Navigate to the project in AWS Pinpoint.
14. Choose Settings, SMS and voice.
15. Number settings --> corresponding phone number. Expand the Two-way SMS section then check Enable two-way SMS.
16. Choose the corresponding ARN. Save.
