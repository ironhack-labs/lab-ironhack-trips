const User = require('../models/User');
const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const fb_app_id = "201843307220165";
const fb_app_secret = "4d9a52f7d36a718f8cd4760f6e64be14";

passport.use(new FbStrategy({
    clientID: fb_app_id,
    clientSecret: fb_app_secret,
    callbackURL: "/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ provider_id: profile.id }, (err, user) => {
      console.log(profile.id)
      console.log(user)
      console.log(user._id)
      if (err) {
        return done(err);
      }
      if (user) {
          User.findByIdAndUpdate(user._id,{
            username: profile.displayName
          }).then(usernew => {
            console.log("updating")
            return done(null, usernew);
          })
      } else{
        console.log(profile.id)
        console.log(profile.displayName)
        const newUser = new User({
          provider_id: profile.id,
          provider_name: profile.displayName
        });
    
        newUser.save((err) => {
          console.log("saving new")
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      }
    });
  
  }));