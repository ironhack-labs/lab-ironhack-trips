const express = require("express");
const authController = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require('passport')
const bcryptSalt = 10;

authController.get("/", (req, res, next) => {
    res.render("auth/login");
});

authController.get("/login", (req, res, next) => {
    res.render("auth/login");
});

authController.get("/login", (req, res, next) => {
    res.render("auth/login");
});

authController.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
}));


authController.get("/facebook", passport.authenticate("facebook"));
authController.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/"
}));



module.exports = authController;