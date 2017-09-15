const express = require('express')
const authRoutes = express.Router()
const passport = require('passport')
const Trip = require('../models/Trip')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));
authRoutes.get("/my-trips",(req,res,next)=>{
  Trip.find({}).then((trips)=>{
      res.render("welcome", {trips})
  }).catch((err)=>next(err))
})

module.exports = authRoutes
