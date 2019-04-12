const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');

var app = express();

// Eka parametri/objecti kertoo kaiken mitä requesti tarttee toimiakseen
// eli URLin, 
request({
  url: '/v1/cryptocurrency/listings/latest',
  //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Tekniikankatu&key=AIzaSyDwOZO1VvYUyJQCfwb7-1ZRMh1ZYQX9LQs',
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});

app.get('/', function (req, res) {
  res.send('Ohsiha harkkatyo etusivu, Prehti')
  // res.render('etusivu', {
  //     title: 'Ohsiha harkkatyo etusivu',
  //     message: 'Pääsit etusivulle, onneksi olkoo!'
  // });

  const { Pool } = require('pg')
  const connectionString = config.connectionString;
  const pool = new Pool({
    connectionString: connectionString,
  })

  const query = 'SELECT * FROM testi_table';
  console.log('Pool kaynnistyy ----------------------------------------------------');

  pool.connect((err, client, done) => {
    const shouldAbort = (err) => {
      if (err) {
          console.error('Error in transaction', err.stack)
          client.query('ROLLBACK', (err) => {
            if (err) {
              console.error('Error rolling back client', err.stack)
            }
            // release the client back to the pool
            done()
          })

          // render HTML with the error message
          // if(buildHtml != undefined && res != null) {
          //     buildHtml(query, undefined, res, err, resultCollector);
          // }
      }
      return !!err
    }


    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      // allow read-only transactions
      client.query('SET TRANSACTION READ WRITE', (err) => {
            if (shouldAbort(err)) return
            client.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED', (err) => {
                if (shouldAbort(err)) return
                // run the query - remember to use parameterized queries when needed!
                client.query(query, (err, result) => {
                    if (shouldAbort(err)) return

                    console.log(result);

                    client.query('COMMIT', (err) => {
                        if (err) {
                            console.error('Error committing transaction', err.stack)
                        }
                        // release the client back to the pool
                        done()
                    })
                // render HTML with result
                // if(buildHtml != undefined && res != null) {
                //     buildHtml(result, res, undefined, resultCollector);
                // }
                });
            });
        });
    });

  });
  
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888');
});