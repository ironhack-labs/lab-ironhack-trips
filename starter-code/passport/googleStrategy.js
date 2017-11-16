const passport = require("passport");
const User = require('../models/User');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
  clientID: "170356349350-vlf2i9gfva3j5e8rfgntmmv217tq8g2q.apps.googleusercontent.com",
  clientSecret: "Icz28OnQfZ3ipYo7beS6cTJK",
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
