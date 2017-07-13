const express = require("express");
const passport = require("passport");

const authRoutes = express.Router();

const User = require("../models/User");

authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/private",
  failureRedirect: "/"
}));

module.exports = authRoutes;
