// File that handles executing all of the queries no matter what the query is
// data_base.js also opens up the database connection and creates the new pool
// TODO: Find out how many db connections there are in the pool ???
const { Pool } = require('pg')
  // TODO: Siirra conffiin
  const connectionString = "postgres://postgres:nobelaner@localhost:5432/cryptoApiDb";
  const pool = new Pool({
    connectionString: connectionString,
  })

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  // process.exit(-1)
})

module.exports.executeQuery = (queryString, sqlParams) => {
  return new Promise((resolve, reject) => {
    // promise - checkout a client
    pool.connect()
    .then(client => {
      return client.query(queryString, sqlParams)
        .then(res => {
          client.release();
          console.log(res.rows[0]);
          return resolve(res.rows);
        })
        .catch(e => {
          client.release();
          console.log(e);
          return reject(e);
        })
    })
  })
  
}