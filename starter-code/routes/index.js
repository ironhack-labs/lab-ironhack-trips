const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
const Trip = require("../models/trip");


router.get("/", (req, res, next) => {
	res.render("index", {title: "Trip diary"});
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", 
{
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

router.get('/my-trips', (req, res, next) => {
	res.render('trips/index');
});

router.get('/my-trips/new', (req, res, next) => {
	res.render('trips/new.ejs');
});


module.exports = router;