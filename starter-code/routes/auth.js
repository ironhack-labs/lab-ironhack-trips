const passport = require("passport");
const router = require("express").Router();
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get("/login", (req, res) => {
  res.redirect("/");
});

router.get("/logout", ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successReturnToOrRedirect: "/my-trips",
  failureRedirect: "/"
}));

module.exports = router;
