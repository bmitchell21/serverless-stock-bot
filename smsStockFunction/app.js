'use strict'

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 */

const { smsResponder }  = require('./smsResponder')

// Calls the SMS responder function for each text message passed in the event parameter.

exports.lambdaHandler = async (event, context) => {
  console.log('Starting handler')
  
  await Promise.all(
    event.Records.map(async (record) => {
      try {
        await smsResponder(record)
      } catch (err) {
        console.error(err)
        return err
      }
    })
  )

  return  {
    'statusCode': 200
  }
}