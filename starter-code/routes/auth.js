const express = require('express');
const authRoutes = express.Router();
const User = require('../models/User');
const passport = require('passport');





authRoutes.get("/facebook", passport.authenticate("facebook"));

authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));



module.exports = authRoutes;
