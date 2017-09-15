const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");

const router = require('express').Router();

router.get("/", (req, res, next) => {
  console.log(req.user)
  res.render("index");
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

router.get('/logout',(req,res) =>{
  req.logout();
  res.redirect("/");
});


module.exports = router;
