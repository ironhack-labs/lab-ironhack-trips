const FbStrategy = require('passport-facebook').Strategy;
const User               = require('../models/User');
const bcrypt             = require('bcrypt');
const passport = require ("passport")

module.exports = function (app) {
  // NEW
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

passport.use(new FbStrategy({
    clientID: "1997223683651830",
    clientSecret: "05e264953f56ae523aad0f6cbb89f678",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['email', "displayName"]
  },  (accessToken, refreshToken, profile, email, done)=>{
    User.findOne({facebookID:profile.id}, (err,user)=>{
        console.log(profile);
        
        if(err) return done(err);
        if(user) return done(null,user);
        const newUser = new User({
            facebookID:profile.id,
            displayName:profile.displayName,
            email:profile.emails.length > 0 ? profile.emails[0].value : null
        });
        newUser.save((err)=>{
          if(err) return done(err);
          done(null, newUser);
        });
      });
  }));
  // NEW
  
  app.use(passport.initialize());
  app.use(passport.session());

}