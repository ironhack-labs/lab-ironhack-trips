const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

router.post('/logout', ensureLogin.ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
