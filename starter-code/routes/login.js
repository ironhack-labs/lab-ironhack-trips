var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
    res.render('./auth/login', { title: 'Express' });
  });

module.exports = router;