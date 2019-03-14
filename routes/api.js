// Yhdistaa kaikki routterit(autentikointi, tietokanta, julkiset resurssit jne)
const config = require('../config');

const api_authentication = require('./api_authentication');
const router = require('express').Router();


router.use(api_authentication);

module.exports = router;