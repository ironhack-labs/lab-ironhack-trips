const express = require('express');
const passport = require("passport")
const router = require("express").Router()
const User = require('../models/user');

router.get("/logout", (req, res) => {
   req.logout();
   res.redirect("/auth/login");
 });

 router.get("/auth/facebook", passport.authenticate("facebook"));
 router.get("/auth/facebook/callback", passport.authenticate("facebook", {
   successReturnToOrRedirect: "/",
   failureRedirect: "/"
 }));

 module.exports = router;
