// Yhdistaa kaikki routterit(autentikointi, tietokanta, julkiset resurssit jne)
const config = require('../config');
var express = require('express');
const path = require("path")
const api_authentication = require('./api_authentication');
// express kirjastosta otetaan Routeri jonka avulla tehdään kaikki asiat oikeassa järjestyksessä
// Router.use rivien järjsstyksessä on suuri merkitys koska joitakin asioita saa tehdä vasta sitten
// kun on autentikoitu -> (router.use(api_authentication);)
const router = require('express').Router();

router.use(express.static(path.join(__dirname, '../public')))

router.use(api_authentication);
//Index page router oma filu
router.use(express.static(path.join(__dirname, '../client')))

//TODO: api routers

module.exports = router;