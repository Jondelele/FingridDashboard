const config = require('./config');
const api = require('./routes/api');
var bodyParser = require('body-parser');

const request = require('request');
var express = require('express');

var app = express();

// Ottaa routterin kayttoon
app.use(bodyParser.json());
app.use(api);


app.listen(config.httpPort, function () {
  console.log('Example app listening on port ' + config.httpPort);
});