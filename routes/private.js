// Moduuli joka asettaa private kansion tiedostot staattisiksi tiedostoiksi
const router = require('express').Router();
var express = require('express');
const path = require("path")

router.use(express.static(path.join(__dirname, '../private')))

// router.get((''), () => {

// });

module.exports = router;