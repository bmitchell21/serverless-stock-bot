'use strict'

const axios = require('axios')
const stockURL = 'https://api.tiingo.com/tiingo/daily/'
const endUrl = '/prices'

/* getStock:
     Returns stock info based on company
*/

const getStock = async function (stockCode) {

  try {
    // Get stock for company provided
    const response = await axios({
      url: `${stockURL}${stockCode}${endUrl}?token=${process.env.APIkey}`,
      method: 'get',
      port: 443,
      responseType: JSON
    })


    
    // Build natural response
    const result = response.data[0] || {};
    const stock = ` Here is your requested stock info: Open - ${parseInt(result.open)} Low - ${parseInt(result.low)} High - ${parseInt(result.high)}.`
    console.log('getStock response: ', stock)
    return stock

  } catch (err) {
    console.error('stockName error: ', err)
    return 'Sorry, there was a problem with the stock tracker.'
  }
}

module.exports = { getStock }