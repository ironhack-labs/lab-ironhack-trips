const passport = require("passport");
const User = require('../models/User');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
  clientID: "127642509660-fm16nqenf4bid830sim9tcjntlptf08n.apps.googleusercontent.com",
  clientSecret: "tMiX1EDAB2DQ0SHnLPzOOcxT",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id,
      username: profile.displayName
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });
}));
