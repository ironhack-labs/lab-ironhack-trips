const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ email:username }, (err, user) => {
        if (err) {
        return next(err);
        }
        if (!user) {
        return next(null, false, { message: "Incorrect username" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
    });
}));

passport.use(new FbStrategy({
  clientID: "1798999740120404",
  clientSecret: "7a1ff621f091fdfaf93b0d43fba79f66",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
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