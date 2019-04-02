// api_authentication.js hoitaa käyttäjän autentikoimisen 
const router = require('express').Router();
const db_user = require('../database/db_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kayttaja menee tai ohjataan autentikoimis sivulle /authenticate
router.post('/authenticate', (req, res) => {
  // Kayttajan lahettamista HTML parameista otetaan irti username ja password
  var userData = {
    username: req.body.username,
    password: req.body.password
  };
  // Validointi tahan

  // Tietokantakysely jossa haetaan kayttajan tiedot
  // then ottaa getUserWithPassword funktion palautttaman promisen vastaan
  // Promiset varmistavat että tästä pisteestä eteenpäin ei mennä ennenkuin tietokantakysely
  // on palautunut. Tämä siksi että nodejs on asynkronista ja jatkaisi ilman promiseja 
  // ohjelman suorittamista eteenpäin ja kaikki menisi ketuiksi jos getUserWithPassword
  // kysely ei ehtisi palata
  db_user.getUserWithPassword(userData).then((userDB) => {

  // Tutkitaan bcryptilla että vastaako salis tietokannan vastaavaan hashiin
  if (!userDB) {

    // Compare tehdään joka tapauksessa jotta aikaa kuluu enemmän. Näin hakkerit eivät saa selville onko username oikea
    bcrypt.compare("dummy_password123132", "$2b$10$VKVTsw9x2Sjr9629P6RMwumQc9vuMEeKAxcoqM82.s/jSf9TjGzRe").then((resp) => {
      return res.status(403).json({err: 'User or password not found'});
    });

  }

  bcrypt.compare(userData.password, userDB.password_hash).then((resp) => {
    if (!resp) {
      // Password väärin, palautetaan error message
      return res.status(403).json({err: 'User or password not found'});
    }
    // TODO: Secret pitaa laittaa conffiin
    // Jos se vastaa hashia niin luodaan käyttäjälle tokeni json web tokenilla, web tokeniin tallennetaan
    // käyttäjän dataa, käyttäjä id ainakin sekä username ja rooli
    const token = jwt.sign({user_id: userDB.user_id}, 'fdfbddfbfbdfdb43434242srg', {expiresIn: '15 days'})

    // Lopuksi token palautetaan käyttäjälle takaisin ja käyttäjä lähettää sen meille joka kerta kun 
    // hän ottaa yhteyttä meidän servereihin jotta kykenemme tunnistamaan että kuka käyttäjä tekee
    // minkäkin requestin. Serverille ei ikinä tallenneta tokenia, se on ainoastaan clientin selaimessa.
    res.cookie('authCookie', token);
    return res.json({token});
  });

  }).catch((e) => {
    // Palauetetaan virhe ilmo käyttäjälle
  });

});
// Tutkii onko käyttäjä autentikoitu
router.use((req, res, next) => {

  return res.status(404).send("Not found!");
  // Todo: Seuraava vaihe
  // Validoi kayttajan json web token, json web tokenin avulla

  //Ohjaa käyttäjä login pagelle, jos ei autentikoitunut (res.redirect())

  // Ja kutsutaan next() jos on validi, jos ei valid niin palautuu virhe ja ei kutsuta next
});

module.exports = router;