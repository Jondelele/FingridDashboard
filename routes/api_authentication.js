const router = require('express').Router();
const db_user = require('../database/db_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/authenticate', (req, res) => {
  var userData = {
    username: req.body.username,
    password: req.body.password
  };
  // Validointi tahan

  // Tietokantakysely jossa haetaan kayttajan tiedot
  // then ottaa getUserWithPassword funktion palautttaman promisen vastaan
  db_user.getUserWithPassword(userData).then((userDB) => {

  // Tutkitaan bcryptilla että vastaako salis tietokannan vastaavaan hashiin
  if (!userDB) {

    // Compare tehdään joka tapauksessa jotta aikaa kuluu enemmän. Näin hakkerit eivät saa selville onko username oikea
    bcrypt.compare("dummy_password123132", "$2b$10$VKVTsw9x2Sjr9629P6RMwumQc9vuMEeKAxcoqM82.s/jSf9TjGzRe").then((resp) => {
      return res.json({err: 'User or password not found'});
    });

  }

  bcrypt.compare(userData.password, userDB.password_hash).then((resp) => {
    if (!resp) {
      // Password väärin
      return res.json({err: 'User or password not found'});
    }
    // Secret pitaa laittaa conffiin
    const token = jwt.sign({user_id: userDB.user_id}, 'fdfbddfbfbdfdb43434242srg', {expiresIn: '15 days'})
    return res.json({token});
  });

  // Jos se vastaa hashia niin luodaan käyttäjälle tokeni json web tokenilla, web tokeniin tallennetaan
  // käyttäjän dataa, käyttäjä id ainakin sekä username ja rooli

  }).catch((e) => {
    // Palauetetaan virhe ilmo käyttäjälle
  })


});

router.use((req, res, next) => {
  // Validoi kayttajan json web token, json web tokenin avulla

  //Ohjaa käyttäjä login pagelle, jos ei autentikoitunut (res.redirect())

  // Ja kutsutaan next() jos on validi, jos ei valid niin palautuu virhe ja ei kutsuta next
});

module.exports = router;