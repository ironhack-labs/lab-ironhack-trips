const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");

const router = require('express').Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router
