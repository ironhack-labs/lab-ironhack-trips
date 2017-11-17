const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/trips",
  failureRedirect: "/index"
}));

router.post('/logout', ensureLogin.ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
