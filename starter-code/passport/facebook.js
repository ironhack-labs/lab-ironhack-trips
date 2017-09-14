const express = require("express");
const passport = require("passport");
const FbStrategy = require('passport-facebook').Strategy;
const User = require ('../models/user');

passport.use(new FbStrategy({
  clientID: "114489382627653",
  clientSecret: "805ad14643ebf2dc625e0b4a81429894",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
