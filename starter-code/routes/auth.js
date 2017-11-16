const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}))

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})

module.exports = router;
