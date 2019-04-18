// Moduuli joka asettaa public kansion tiedostot staattisiksi tiedostoiksi
const router = require('express').Router();
var express = require('express');
const path = require("path")

// Kertoo appille että public kansiosta löytyy tiedostoja joihin pääsee
// käsiksi niiden nimen perusteella
router.use(express.static(path.join(__dirname, '../public')))

// router.get((''), () => {

// });

module.exports = router;