const express = require('express');
const router = express.Router();
const PATHS = require('./paths');

router.get(PATHS.ROOT_PATH, function(req, res, next) {
    res.render('index', { title: "Ironhacks Trips" });
});

module.exports = router;
