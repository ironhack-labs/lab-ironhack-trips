const express    = require('express');
const router     = express.Router();
const passport = require("passport");
//const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/facebook",
  failureRedirect: "/"
}));

module.exports = router;
