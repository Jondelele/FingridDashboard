const router = require('express').Router();
const request = require('request');
var bodyParser = require('body-parser');

router.get('/data', function (req, res) {
  request({
    url: 'https://api.fingrid.fi/v1/variable/58/events/json?start_time=2019-01-01T01%3A01%3A01Z&end_time=2019-03-01T01%3A01%3A01Z',
    json: true,
    headers: {
      'x-api-key': 'MOwvzyd8yH9KbABqnpCIZ49Lzkw2ruay7Yc1dcT3'
    }
  }, (error, response, body) => {
    res.json(body);
  });

});

module.exports = router;