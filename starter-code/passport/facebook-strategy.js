const User = require('../models/User');
const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const fb_app_id = "329857720837309";
const fb_app_secret = "2075af5dc1baebba2bb6155c47295d78";

passport.use(new FbStrategy({
    clientID: fb_app_id,
    clientSecret: fb_app_secret,
    callbackURL: "/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
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
        provider_id: profile.id,
        provider_name: profile.displayName
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));
