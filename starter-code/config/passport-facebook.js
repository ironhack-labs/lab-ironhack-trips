const passport = require("passport");
const User = require('../models/User');
const facebookStrategy = require('passport-facebook')
  .Strategy;

passport.use(new facebookStrategy({
  clientID: "490288721343130",
  clientSecret: "c48242dc7b2e2c57922dcb4cb796897e",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({provider_id: profile.id}, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);

    const newUser = new User({
      provider_id: profile.id,
      provider_name: profile.displayName
    });

    newUser.save((err) => {
      if (err) return done(err);
      done(null, newUser);
    });
  });

}));
