'use strict'

const axios = require('axios')
const stockURL = 'https://api.tiingo.com/tiingo/daily/'
const endUrl = '/prices?token='

/* getStock:
     Returns stock info based on company
*/

const getStock = async function (stockCode) {

  try {
    // Get stock for company provided
    const response = await axios({
      url: `${stockURL}&stock=${stockName}&end=${endUrl}&APPID=${process.env.APIkey}`,
      method: 'get',
      port: 443,
      responseType: JSON
    })

    // Build natural response
    const stock = ` ${stockName}: Open - ${parseInt(response.body.open)} Low - ${parseInt(response.body.low)} High - ${parseInt(response.body.open)}.`
    console.log('getStock response: ', stock)
    return stock

  } catch (err) {
    console.error('stockName error: ', err)
    return 'Sorry, there was a problem with the stock tracker.'
  }
}

module.exports = { getStock }