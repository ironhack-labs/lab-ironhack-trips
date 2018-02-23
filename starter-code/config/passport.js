const FbStrategy         = require('passport-facebook').Strategy;
const User               = require('../models/User');
const passport           = require ("passport")


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
  clientID: "168666297113617",
  clientSecret: "60728078d4f565db1d3dee91f0aa074f",
  callbackURL: "/auth/facebook/callback",
  profileFields: ['email', "displayName"]
},
  (accessToken, refreshToken, profile, done)=>{
User.findOne({facebookID:profile.id}, (err,user)=>{
    console.log(profile);
    if(err) return done(err);
    if(user) return done(null,user);
    const newUser = new User({
        facebookID:profile.id,
        providerName:profile.displayName,
    });
    console.log(newUser);
    newUser.save((err)=>{
      if(err) return done(err);
      done(null, newUser);
    });
  });
}));

  
  app.use(passport.initialize());
  app.use(passport.session());

}