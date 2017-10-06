var express = require("express");
var router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/my-trips",
    failureRedirect: "/"
  })
);

module.exports = router;
