const FbStrategy = require('passport-facebook').Strategy;
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

passport.use(new FbStrategy({
  clientID: process.env.APP_ID,
  clientSecret: process.env.SESSION_SECRET,
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) return done(err)
    if (user) return done(null, user)

    const newUser = new User({
      provider_id: profile.id,
      provider_name: profile.displayName
    })
    newUser.save((err) => {
      if (err) return done(err)
      done(null, newUser)
    })
  })
}))

module.exports = passport