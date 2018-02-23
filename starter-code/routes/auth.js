const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//facebook login
router.get("/auth/facebook", passport.authenticate("facebook", {scope: 'email'}));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/"
}));
//facebook login

//logout
router.post("/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
});


module.exports = router;