const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('trips',{user:req.user});
});


router.get('/new-trip', function (req, res, next) {
    res.render('new-trip',{user:req.user});
});

module.exports = router;