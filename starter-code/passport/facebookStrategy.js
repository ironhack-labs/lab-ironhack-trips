const passport = require("passport");
const User = require('../models/User');
const FaceBookStrategy = require("passport-facebook").Strategy;

passport.use(new FaceBookStrategy({
  clientID: "-",
  clientSecret: "-",
  callbackURL: "authFacebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      provider_id: profile.id,
      provider_name:profile.displayName
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
