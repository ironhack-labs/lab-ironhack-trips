const express    = require("express");
const passport   = require("passport");
const FbStrategy = require('passport-facebook').Strategy;
const router     = express.Router();
const User       = require('../models/User');


router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}));

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
