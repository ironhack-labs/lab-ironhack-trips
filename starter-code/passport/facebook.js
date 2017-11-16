const passport   = require('passport');
const User       = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy

passport.use(new FbStrategy({
  clientID: '1867730416592774',
  clientSecret: 'c0c2d59e1f0263b656328dbf702dfb03',
  callbackURL: "/auth/facebook/callback"
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) return done(err)
    if (user) return done(null, user)

    const newUser = new User({
      facebookID: profile.id,
      facebookName: profile.displayName
    });

    newUser.save((err) => {
      if (err) return done(err)
      done(null, newUser)
    });
  });
}));
