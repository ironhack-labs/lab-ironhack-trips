const express = require('express')
//const FbStrategy = require("passport-facebook").Strategy;
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const authController = express.Router()
const User = require('../models/user')

const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

 /*  authController.get('/', (req, res, next) => {
    res.render('index', {
        title: "Trip diary"
    })
})  

 authController.get("/auth/facebook", passport.authenticate('facebook'))
authController.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: "/my-trips",
  failureRedirect: '/'  
}))   
 */
authController.get('/', (req, res, next) => {
    res.render('auth/signup')
})

authController.post('/signup' , (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    if(username === "" || password === '') {
        res.render('auth/signup', {
            message: 'Indicate a username and a password'
        })
        return;
    }

    User.findOne({username}, "username", (err, user) => {
        if (user !== null) {
            res.render('auth/signup', {
                message: "The username is already exists"
            })
            return
        }

        let salt = bcrypt.genSaltSync(bcryptSalt)
        let hashPass = bcrypt.hashSync(password, salt)

        const newUser = User({
            username,
            password: hashPass
        })

        newUser.save((err) => {
            if (err) {
                res.render('auth/signup', {
                    message: 'Sorry something went wrong'
                })
            } else {
                res.render('auth/login')
            }
        })
    })
})
authController.get('/login', (req, res, next) => {
    res.render('auth/login')
})

authController.post('/login', passport.authenticate('local', {
    successRedirect: 'trips/index',
    failureRedirect: '/login',
}))


authController.get('/logout', (req, res) => {
    req.logout()
    res.render('auth/login')
})

authController.get("/trips",ensureLoggedIn(), upload.single('photo'),  (req, res) => {
  res.render("trips/index", {
    user: req.user
  });
});

module.exports = authController