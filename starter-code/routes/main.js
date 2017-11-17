
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'mi titulo'});
});

router.get('/profile', (req, res) => {
    res.render('private-page');
});


module.exports = router;
