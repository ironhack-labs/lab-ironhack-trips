const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("layouts/my-trips");
});

module.exports = router;
