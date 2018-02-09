const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const User = require("../models/User");

authRoutes.get("/", passport.authenticate("facebook"));
authRoutes.get(
  "/callback",
  passport.authenticate("facebook", {
    successRedirect: "/my-trips",
    failureRedirect: "/"
  })
);

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
