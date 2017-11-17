// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
// User model
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/logout', ensureLoggedIn(), (req,res)=>{
  req.logout();
  res.redirect('/');
});
module.exports = router;
