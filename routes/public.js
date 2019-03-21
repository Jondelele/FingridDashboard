const router = require('express').Router();
var express = require('express');
const path = require("path")

router.use(express.static(path.join(__dirname, '../public')))

// router.get((''), () => {

// });

module.exports = router;