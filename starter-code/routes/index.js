const express = require('express')
    /*const FbStrategy = require("passport-facebook").Strategy;*/
const passport = require('passport')
const ensureLogin = require('connect-ensure-login')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const authController = express.Router()
const User = require('../models/user')

authController.get('/', (req, res, next) => {
    res.render('index', {
        title: "Trip diary"
    })
})

authController.get("/auth/facebook", passport.authenticate('facebook'))
authController.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: "/my-trips",
    failureRedirect: '/'
}))

authController.get("/my-trips", (req, res, next) => {
    res.render('my-trips', {
        title: "Trip diary"
    })
})


module.exports = authController