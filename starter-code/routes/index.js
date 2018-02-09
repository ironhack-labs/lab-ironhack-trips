const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { user: req.user });
});

module.exports = router;
