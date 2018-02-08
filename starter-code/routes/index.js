const express = require("express");
const router = express.Router();
const passport = require('passport')
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/home", (req, res, next) => {
  res.render("home");
});
module.exports = router