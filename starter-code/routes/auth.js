const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

//ensure login
const ensureLogin = require("connect-ensure-login");

//passport
const passport = require("passport");


//facebook login
router.get("/auth/facebook", passport.authenticate("facebook", {scope: 'email'}));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/private",
    failureRedirect: "/login"
}));

//logout
router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
 });
 

module.exports = router;