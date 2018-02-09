const express  = require("express");
const User = require("../models/User");
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");
const router = require('express').Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/auth/fb", passport.authenticate("facebook"));
router.get("/auth/fb/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}));


module.exports = router;