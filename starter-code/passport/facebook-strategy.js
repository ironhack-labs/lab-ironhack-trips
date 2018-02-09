const User = require('../models/User');
const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const fb_app_id = "1865220523497303";
const fb_app_secret = "5c609f882bf4e13e810f16f7afbb59db";

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