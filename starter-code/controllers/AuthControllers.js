const passport = require('passport')
const User = require('../models/User')

module.exports = {
  facebook: passport.authenticate("facebook"),
  facebookCallback: passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/"
  })
}