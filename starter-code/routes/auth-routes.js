const express = require("express");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const authRoutes = express.Router();

const User = require("../models/user");

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/my-trips",
    failureRedirect: "/"
  })
);

module.exports = authRoutes;
