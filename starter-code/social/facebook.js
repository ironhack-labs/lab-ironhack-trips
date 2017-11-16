const passport= require("passport");
const FbStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new FbStrategy({
  clientID: "371127803335775",
  clientSecret: "bb4e6159e6ccc2aa77fc5d63e162a85c",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      facebookID: profile.id,
      name: profile.displayName.split(" ")[0],
      familyName: profile.displayName.split(" ")[1],
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
