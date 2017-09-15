const FbStrategy = require('passport-facebook').Strategy;
const passport = require('passport')
const User = require('../models/User')

passport.use(new FbStrategy({
  clientID: "353446335077306",
  clientSecret: "78100147b59d2acd6f4f814df2e0a2fa",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      provider_id: profile.id,
      provider_name : profile.displayname
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
