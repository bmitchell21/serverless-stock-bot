'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' })

const { getStock } = require('./getStock')
const KEYWORD = 'stock'

const validateStock = function (elementValue){
  let stockTest = /^[a-zA-Z]{1,4}$/
   return stockTest.test(elementValue)
}

const sendSMS = async function (params) {
	const pinpoint = new AWS.Pinpoint()
	console.log('sendSMS called: ', params)

	return new Promise((resolve, reject) => {
		pinpoint.sendMessages(params, function(err, data) {
			if(err) {
				console.error(err)
				reject(err)
			} else {
				console.log("Message sent. Data: ", data)
				resolve(data)
			}
		})
	})
}

const smsResponder = async (event) => {

	const msg = JSON.parse(event.Sns.Message)
	const msgWords = msg.messageBody.split(" ")

	// Check the first word of the text message is the keyword
	if (msgWords[0].toLowerCase() !== KEYWORD) return console.log('No keyword found - exiting')

	// Validate stock name and get price
	let message =''
	const stockCode = msgWords[1]

	if (validateStock(stockCode)) {
		message = await getStock(stockCode)
	} else {
		message = 'Invalid stock symbol - text me in the format "stock stocksymbol".'
	}

	// Send the SMS response
	const params = {
		ApplicationId: process.env.ApplicationId,
		MessageRequest: {
			Addresses: {
				[msg.originationNumber]: {
					ChannelType: 'SMS'
				}
			},
			MessageConfiguration: {
				SMSMessage: {
					Body: message,
					MessageType: 'PROMOTIONAL',
					OriginationNumber: msg.destinationNumber
				}
			}
		}
	}

	return console.log(await sendSMS(params))
}






module.exports = { smsResponder }