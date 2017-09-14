const authRoutes = require('express').Router();
const passport       = require('passport');


authRoutes.get("/", (req, res, next) => {
  res.render("index");
});

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

module.exports = authRoutes;
