const User = require('../models/User');
const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const fb_app_id = "556673271382178";
const fb_app_secret = "9aad8a6e5994034de48be13bac8d96d1";

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
          User.findByIdAndUpdate(user._id,{
            username: profile.displayName
          }).then(usernew => {
            return done(null, usernew);
          })
      }
  
      const newUser = new User({
        facebookID: profile.id,
        username: profile.displayName
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));