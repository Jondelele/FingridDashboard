// api_authentication.js hoitaa käyttäjän autentikoimisen 
const router = require('express').Router();
const db_user = require('../database/db_user');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kayttaja menee tai ohjataan autentikoimis sivulle /authenticate
router.post('/authenticate', (req, res) => {
  // Kayttajan lahettamista HTML parameista otetaan irti username ja password
  var userData = {
    username: req.body.username,
    password: req.body.password
  };

  // Tietokantakysely jossa haetaan kayttajan tiedot
  // then ottaa getUserWithPassword funktion palauttaman promisen vastaan
  // Promiset varmistavat että tästä pisteestä eteenpäin ei mennä ennenkuin tietokantakysely
  // on palautunut. Tämä siksi että nodejs on asynkronista ja jatkaisi ilman promiseja 
  // ohjelman suorittamista eteenpäin ja kaikki menisi pieleen jos getUserWithPassword
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
    // Jos password vastaa hashia niin luodaan käyttäjälle tokeni json web tokenilla, web tokeniin tallennetaan
    // käyttäjän dataa, kuten id ja username
    // Tokenin tiedot saadaan myöhemmin käyttöön decoded objectista
    const token = jwt.sign({user_id: userDB.user_id}, config.secret, {expiresIn: '15 days'})
  
    // Lopuksi token palautetaan käyttäjälle takaisin ja käyttäjä lähettää sen meille joka kerta kun 
    // hän ottaa yhteyttä meidän servereihin jotta kykenemme tunnistamaan että kuka käyttäjä tekee
    // minkäkin requestin. Serverille ei ikinä tallenneta tokenia, se on ainoastaan clientin selaimessa tallessa.
    res.cookie('authCookie', 'Bearer ' + token);
    return res.json({token});
  });

  }).catch((e) => {
    // Palautetaan käyttäjälle virhe jos jokin meni pieleen
    return res.json(e);
  });

});

// TODO: Logout router tähän, tuhotaan cookie ja redirect to login page.html
// Logouttia ei ole toteutettu, koska jätin harjoitustyön 2. vaiheen tekemättä

// Tutkii onko käyttäjä autentikoitu. Tähän lohkoon mennään vain ja ainoastaan jos käyttäjä
// koittaa mennä jollekkin sivulle joka vaatii sen että on autentikoitu
// aka käyttäjällä on validi token
router.use((req, res, next) => {
  // Otetaan json web token irti headereista ja tallennetaan bearerHeader muuttujaan.
  const bearerHeader = req.headers['authorization'] || req.cookies ? req.cookies.authCookie : null;

  if(bearerHeader && bearerHeader.split(' ').length == 2){
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];

    // Validoidaan kayttajan json web token, json web tokenin avulla
    // Tarkistetaan token. Nextiä kutsutaan vain jos err on null aka kaikki meni hyvin
    // Jos errissä on jotain heitetään 403
    jwt.verify(bearerToken, config.secret, (err, decoded) => {
      if(err) {
        res.status(403).redirect('/login.html');
      } else {
        req.decoded = decoded;
        next();
      }  
    });

  } else {
    // Forbidden, eli token ei ollut validi
    res.status(403).redirect('/login.html');
  }
});

module.exports = router;