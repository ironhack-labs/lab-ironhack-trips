const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/main"
}));

router.get('/main', (req, res, next) => {
  res.render('main');
});

router.get('/logout', (req, res, next) => {
  res.render('index');
})

module.exports = router;
