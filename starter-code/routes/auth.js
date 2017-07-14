const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const path = require('path');




const User = require("../models/User");
/* GET home page. */

authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/private",
  failureRedirect: "/"
}));

module.exports = authRoutes;