// Moduuli joka hakee Fingridin API:sta sähködataa
const router = require('express').Router();
const request = require('request');
var moment = require('moment-timezone');
moment().tz("Europe/Helsinki").format();
const config = require('../config');

// Haku jolla haetaan sähködataa viimeisen 24 tunnin ajalta. Datassa on 4 tunnin viive
// koska API:sta ei saa uudempaa dataa
router.get('/data/lastday', function (req, res) {
  // Luodaan API haulle alku ja loppu päivämäärät, jotta API tietää miltä aikaväliltä halutaan dataa
  var currentDate = moment().subtract(4, 'hours');
  var yesterdaysDate = moment().subtract(27, 'hours');

  // Luodaan query URL joka hakee viimeisen 24h ajalta Venäjän Suomeen myymän sähkön tehon tunnin välein mitattuna
  var apiQueryUrl = 'https://api.fingrid.fi/v1/variable/58/events/json?start_time=' + yesterdaysDate.format('YYYY-MM-DDT') + 
        yesterdaysDate.format('HH:00:00') + 'Z' + '&end_time=' + currentDate.format('YYYY-MM-DDT') + currentDate.format('HH:00:00') + 'Z';

  // Request kirjasto mahdollistaa queryn tekemisen. Queryyn laitetaan mukaan 
  // x-api-key, jotta Fingridin REST API tunnistaa kuka kutsun tekee
  request({
    url: apiQueryUrl,
    json: true,
    headers: {
      'x-api-key': config.xApiKey
    }
  }, (error, response, body) => {
    // Lopuksi palautetaan queryn tulos
    res.json(body);
  });
});

// Hakee Fingridin API:sta tämän hetkisen sähkön myynnin tehon
router.get('/data/power-now', function (req, res) {
  // Luodaan API haulle alku ja loppu päivämäärät, jotta API tietää miltä aikaväliltä halutaan dataa
  var currentDate = moment().subtract(0, 'hours');
  var yesterdaysDate = moment().subtract(5, 'hours');

  // Luodaan query URL joka hakee tämän hetkisen Venäjän Suomeen myymän sähkön tehon
  var apiQueryUrl = 'https://api.fingrid.fi/v1/variable/58/events/json?start_time=' + yesterdaysDate.format('YYYY-MM-DDT') + 
                      yesterdaysDate.format('HH:00:00') + 'Z' + '&end_time=' + currentDate.format('YYYY-MM-DDT') + currentDate.format('HH:00:00') + 'Z';

  // Request kirjasto mahdollistaa queryn tekemisen. Queryyn laitetaan mukaan x-api-key, jotta Fingridin REST API tunnistaa kuka kutsun tekee
  request({
    url: apiQueryUrl,
    json: true,
    headers: {
      'x-api-key': config.xApiKey
    }
  }, (error, response, body) => {
    // Lopuksi palautetaan queryn tulos
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