const router = require('express').Router();
const db_user = require('../database/db_user');

router.post('/authenticate', (req, res) => {
  var userData = {
    username: req.body.username,
    password: req.body.password
  };
  // Validointi tahan

  // Tietokantakysely jossa haetaan kayttajan tiedot
  // then ottaa getUserWithPassword funktion palautttaman promisen vastaan
  db_user.getUserWithPassword(userData).then((userDB) => {

  }).catch((e) => {
    // Palauetetaan virhe ilmo käyttäjälle
  })

  // Tutkitaan bcryptilla että vastaako salis tietokannan vastaavaan hashiin

  // Jos se vastaa hashia niin luodaan käyttäjälle tokeni json web tokenilla, web tokeniin tallennetaan
  // käyttäjän dataa, käyttäjä id ainakin sekä username ja rooli


});

router.use((req, res, next) => {
  // Validoi kayttajan json web token, json web tokenin avulla

  // Ja kutsutaan next jos on validi, jos ei valid niin palautuu virhe ja ei kutsuta next
});

module.exports = router;