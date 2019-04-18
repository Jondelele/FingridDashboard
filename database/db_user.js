// Tiedosto joka suorittaa user datan hakemisen kannasta. Db_user.js hoitaa 
// querystringin luomisen oikeaoppisesti sql parametreja hyödyntäen
// db_user.js ei siis tee varsinaista hakua
// tietokantaan vaan haun hoitaa database_driver.js tiedostossa oleva executeQuery funktio
// Tama db_user.js kutsuu database_driver.js moduulin funktiota executeQuery
// Joka vasta suorittaa varsinaisen haun
const db_driver = require('./database_driver');

module.exports.getUserWithPassword = (userData) => {
  const queryString = `
    SELECT user_id, user_name, password_hash
    FROM public.account
    WHERE user_name = $1;  
  `;
  const sqlParams = [userData.username];

  return db_driver.executeQuery(queryString, sqlParams).then((res) => {
    return res.length > 0 ? res[0] : null;
  });
}
