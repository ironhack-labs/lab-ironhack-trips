var express = require('express');
var router = express.Router();
const PATHS = require('./paths');

/* GET users listing. */
router.get(PATHS.USERS_PATH, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
