const router = require('express').Router();
const request = require('request');
// var moment = require('moment');
var moment = require('moment-timezone');
moment().tz("Europe/Helsinki").format();

// moment().format();
const config = require('../config');

router.get('/data/lastday', function (req, res) {
  // var currentDate = new Date(); 
  var currentDate = moment();
  // currentDate.setDate(currentDate.getDate() - 1);
  var yesterdaysDate = moment().subtract(1, 'days');

  console.log("Ensimmainen");
  console.log(currentDate);

  console.log("Toinen");
  console.log(yesterdaysDate); 
  console.log("Kolmass");

  var apiQueryUrl = 'https://api.fingrid.fi/v1/variable/58/events/json?start_time=' + yesterdaysDate.format('YYYY-MM-DDT') + yesterdaysDate.format('HH:00:00') + 'Z'
                                                                     + '&end_time=' + currentDate.format('YYYY-MM-DDT') + currentDate.format('HH:00:00') + 'Z';
  console.log(apiQueryUrl);

  // https://api.fingrid.fi/v1/variable/58/events/json?start_time=2019-01-01T 01 % 3A01 % 3A01 Z & end_time=2019-03-01T01%3A01%3A01Z

  request({
    url: apiQueryUrl,
    json: true,
    headers: {
      'x-api-key': config.xApiKey 
    }
  }, (error, response, body) => {
    res.json(body);
  });
});

router.get('/data/last6months', function (req, res) {
  request({
    url: 'https://api.fingrid.fi/v1/variable/58/events/json?start_time=2019-03-04T00%3A00%3A00Z&end_time=2019-03-05T00%3A00%3A00Z',
    json: true,
    headers: {
      'x-api-key': config.xApiKey
    }
  }, (error, response, body) => {
    res.json(body);
  });

});

module.exports = router;