const express = require('express');
const router  = express.Router();
const passport = require ("passport")
const ensureLogin = require('connect-ensure-login');

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect:"/my-trips" ,
  failureRedirect: "/"
}));


router.post('/logout', ensureLogin.ensureLoggedIn(), (req, res) => {
    req.logout();
    res.redirect('index');
});




module.exports = router;