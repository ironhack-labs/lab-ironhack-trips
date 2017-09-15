const express = require('express')
const authRoutes = express.Router()
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));
authRoutes.get("/my-trips",(req,res,next)=>{

  res.render("welcome", {user: req.user})
    console.log(req.user)
})
module.exports = authRoutes
