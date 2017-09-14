const User       = require("../models/User")
const bcrypt     = require("bcrypt")
const bcryptSalt = 10
const path       = require('path')
const passport   = require('passport')
const debug      = require('debug')("app:auth:local")

const router     = require('express').Router()

router.get("/", (req, res, next) => {
  res.render("index")
})


router.post("/signup", (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" })
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    debug("User created")

    const newUser = new User({
      username,
      password: hashPass
    })
    .save()
    .then(user => res.redirect('/'))
    .catch(e => res.render("auth/signup", { message: "Something went wrong" }))

  })
})

router.get('/login',(req,res) =>{
  res.render('auth/login',{ message: req.flash("error") })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}))

router.post('/logout',(req,res) =>{
  req.logout()
  res.redirect("/")
})


router.get("/auth/facebook", passport.authenticate("facebook"))
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}))


module.exports = router
