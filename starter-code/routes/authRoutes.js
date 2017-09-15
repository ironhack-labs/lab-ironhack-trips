const User = require("../models/User");
//const bcrypt = require("bcrypt");
//const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;

const router = require('express').Router();


router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/mytrips", (req, res, next) => {
  res.render("mytrips");
});


router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/mytrips",
  failureRedirect: "/"
}));

module.exports = router;
