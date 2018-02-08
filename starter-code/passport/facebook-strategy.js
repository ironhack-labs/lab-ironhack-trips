const User = require('../models/User');
const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const fb_app_id = "1545563245499138";
const fb_app_secret = "dfcf4ac7a92e64d52816227efb817afb";

passport.use(new FbStrategy({
  clientID: fb_app_id,
  clientSecret: fb_app_secret,
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile)
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