// app.js Käynnistää serverin ja ottaa expressin käyttöön lukemalla sen muuttujaan app
const config = require('./config');
const api = require('./routes/api');
var bodyParser = require('body-parser');

const request = require('request');
var express = require('express');

var app = express();

app.use(bodyParser.json());
app.use(api);


app.listen(config.httpPort, function () {
  console.log('Example app listening on port ' + config.httpPort);
});