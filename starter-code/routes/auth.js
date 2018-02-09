const express = require("express");
const authRoutes = express.Router();
const passport = require('passport')
const User = require("../models/User");

authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}));

module.exports = authRoutes;