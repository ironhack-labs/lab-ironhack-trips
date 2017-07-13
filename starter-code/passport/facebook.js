const passport = require("passport");
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: "439815873069083",
  clientSecret: "8051f5c743505a63356f014aab770dcd",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
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
