const express = require('express');
const passport = require("passport");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get("/", passport.authenticate("facebook"));

router.get("/callback", passport.authenticate("facebook", {
  successRedirect: "/privateTrip",
  failureRedirect: "/"
}));


router.post('/logout', ensureLogin.ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
