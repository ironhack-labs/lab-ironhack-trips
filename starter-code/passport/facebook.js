const passport      = require("passport");
const User =  require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;
const path = require('path');
var debug = require('debug')('travel-diaries:'+path.basename(__filename));

passport.use(new FbStrategy({
  clientID: "1860995940886098",
  clientSecret: "1828d2267d4f20a4b1f0755c98511740",
  callbackURL: "/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  debug(profile);
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
      debug(newUser);
      done(null, newUser);
    });
  });


}));
