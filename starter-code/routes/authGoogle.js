const express = require('express');
const passport = require("passport");
const router = express.Router();


router.get("/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get('/google/callback', passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/private"
}));

module.exports = router;
