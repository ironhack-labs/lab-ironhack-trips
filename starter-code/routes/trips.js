const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("layouts/my-trips");
});

module.exports = router;
