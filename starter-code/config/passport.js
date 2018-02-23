const FbStrategy = require('passport-facebook').Strategy;
const User               = require('../models/user');
const passport = require ("passport")

module.exports = function (app) {
  // NEW
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });


  passport.use(new FbStrategy({
    clientID: "1928882873810863",
    clientSecret: "0cd2f1c975a07cee8387499ea369f0ab",
    callbackURL: "/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
       console.log(profile);
      const newUser = new User({
        facebookID: profile.id,
        provider_name: profile.displayName

      });
     console.log(newUser);
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));
  

  app.use(passport.initialize());
  app.use(passport.session());

}