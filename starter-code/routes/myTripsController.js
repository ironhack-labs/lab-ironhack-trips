const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get("/", (req, res, next) => {

    res.render("my-trips/index");

});

module.exports = router;
