const router = require('express').Router();
const request = require('request');
const config = require('../config');

router.get('/data', function (req, res) {
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