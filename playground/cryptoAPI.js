const request = require('request');

// Eka parametri/objecti kertoo kaiken mitä requesti tarttee toimiakseen
// eli URLin, 
request({
  url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  json: true,
  headers: {
    'X-CMC_PRO_API_KEY': '1c66e485-86d9-46ba-bd20-2a84baf528ce'
  }
}, (error, response, body) => {
  console.log(body.data[0]);
});