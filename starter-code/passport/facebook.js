const passport = require('passport');
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;


// Copied from learning unit
passport.use(new FbStrategy({
  clientID: '1645439888852780',
  clientSecret: '740acaa0f61a66685269675942921744',
  callbackURL: '/auth/facebook/callback'
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
