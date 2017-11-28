const passport = require("passport");
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;


passport.use(new FbStrategy({
  clientID: "132052390755959",
  clientSecret: "9287890815a3241f48b473631ad0a2dc",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);

    const newUser = new User({
      facebookID: profile.id,
      facebookName: profile.displayName
    });

    newUser.save((err) => {
      if (err) return done(err);
      done(null, newUser);
    });
  });

}));
