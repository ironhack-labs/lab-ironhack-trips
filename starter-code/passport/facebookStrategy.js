const passport = require("passport");
const User = require('../models/User');
const FaceBookStrategy = require("passport-facebook").Strategy;

passport.use(new FaceBookStrategy({
  clientID: "930574457098224",
  clientSecret: "dee8d32f70ccbfe2a7a7181b5222c287",
  callbackURL: "/auth/facebook/callback"
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
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
