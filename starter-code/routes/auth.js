const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/auth/private-profile",
  failureRedirect: "/"
}));

router.get('/private-profile', (req, res) => {
  res.render('profile/private');
})

module.exports = router;
