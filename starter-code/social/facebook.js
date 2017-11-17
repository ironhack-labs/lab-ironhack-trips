//Requires for the cookie management middleware.
const passport = require ('passport');
const FbStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');


// Authentication
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
  clientID: "298511430641347",
  clientSecret: "4f880232fd00f827b859e42c3cd0f5d1",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    console.log(profile)
    const newUser = new User({
      facebookID: profile.id,
      name: profile.displayName.split(" ")[0],
      familyName: profile.displayName.split(" ")[1],
      role: 'Student',
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

// Exporta una funcion app que permite al app.js inicializar sesion y guardarla
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
