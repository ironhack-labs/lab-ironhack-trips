const express = require('express');
const router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');  
});

router.get('/my-trips', function(req, res, next) {
    res.render('trips/index');  
});

module.exports = router;