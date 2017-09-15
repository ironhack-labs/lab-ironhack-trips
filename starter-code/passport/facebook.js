const passport = require('passport');
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: "158488648066832",
  clientSecret: "a03af13d51156b0711389092120ad250",
  callbackURL: "/auth/facebook/callback"}, (accessToken, refreshToken, profile, next) => {
  console.log(profile);
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return next(null, user);
    }

    const newUser = new User({
      provider_id: profile.id,
      provider_name: profile.displayName
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      next(null, newUser);
    });
  });

}));
