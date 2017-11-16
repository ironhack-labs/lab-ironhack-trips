const express = require("express");
const router = express.Router();
const User = require('../models/User');

// Go to login form
router.get("/",(req, res, next) => {
  res.render("/auth/login");
});

module.exports = router;
