var express = require('express');
var router = express.Router();

/* GET home page. */
authRoutes.get("/auth/facebook", passport.authenticate("facebook"));


module.exports = router;

