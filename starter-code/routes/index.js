const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const PATHS = require('./paths');

/* GET home page. */
router.get(PATHS.ROOT_PATH, function(req, res, next) {
  Campaign.find({}).populate('_creator').exec((err, campaigns) => {
    res.render('index', { campaigns });
  });
});

module.exports = router;
