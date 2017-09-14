const express = require('express');
const passport = require('passport');

const UserModel = require('../models/user-model.js');


const router = express.Router();

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/",
  failureFlash: true
}));

module.exports = router;
