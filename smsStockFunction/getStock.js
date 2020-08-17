
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
      url: `${stockURL}${stockCode}${endUrl}&token=${process.env.APIkey}`,
      method: 'get',
      port: 443,
      responseType: JSON
    })

    // Build natural response
    const stock = ` Here is your request stock info: Open - ${parseInt(response.data.open)} Low - ${parseInt(response.data.low)} High - ${parseInt(response.data.high)}.`
    console.log('getStock response: ', stock)
    return stock

  } catch (err) {
    console.error('stockName error: ', err)
    return 'Sorry, there was a problem with the stock tracker.'
  }
}

module.exports = { getStock }
