const router = require('express').Router();
const request = require('request');
// var moment = require('moment');
var moment = require('moment-timezone');
moment().tz("Europe/Helsinki").format();

// moment().format();
const config = require('../config');

router.get('/data/lastday', function (req, res) {
  // var currentDate = new Date(); 
  var currentDate = moment().subtract(4, 'hours');
  var yesterdaysDate = moment().subtract(27, 'hours');

  var apiQueryUrl = 'https://api.fingrid.fi/v1/variable/58/events/json?start_time=' + yesterdaysDate.format('YYYY-MM-DDT') + 
                      yesterdaysDate.format('HH:00:00') + 'Z' + '&end_time=' + currentDate.format('YYYY-MM-DDT') + currentDate.format('HH:00:00') + 'Z';

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