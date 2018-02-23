var express = require('express');
var router = express.Router();

/* GET home page. */
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/private-page",
    failureRedirect: "/"
  }));


module.exports = router;