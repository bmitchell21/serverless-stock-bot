# serverless-stock-bot

This is a SAM application that, when finished, returns the high, low, and open stock price for a specified company.

The application uses two way SMS using AWS Pinpoint, Lambda and SAM.  

The user must text the designated phone number in this format: "stock stocksymbol"

