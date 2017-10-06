const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/my-trips", ensureAuthenticated, function(req, res, next) {
  res.render("my-trips");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
