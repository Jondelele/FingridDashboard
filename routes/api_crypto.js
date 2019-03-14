const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.get('/', function (req, res) {
  res.send('Ohsiha harkkatyo etusivu, Prehti')

  request({
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    json: true,
    headers: {
      'X-CMC_PRO_API_KEY': '1c66e485-86d9-46ba-bd20-2a84baf528ce'
    }
  }, (error, response, body) => {
    console.log(body.data[0]);
  });

});

app.listen(8888, function () {
  console.log('Example app listening on port 8888');
});