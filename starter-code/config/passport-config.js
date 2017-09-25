const passport = require('passport');

const UserModel = require('../models/user-model.js');

passport.serializeUser((userFromDb, done) => {
    done(null, userFromDb._id);
});

passport.deserializeUser((idFromBowl, done) => {
    UserModel.findById(
      idFromBowl,

      (err, userFromDb) => {
          if (err) {
              done(err);
              return;
          }
          done(null, userFromDb);
      }
    );
});

const FbStrategy = require('passport-facebook').Strategy;
passport.use(
  new FbStrategy(
    {
        clientID: process.env.fb_app_id,
        clientSecret: process.env.fb_app_secret,
        callbackURL: '/auth/facebook/callback'
    },

    (accessToken, refreshToken, profile, done) => { //successful login response
        console.log(profile);
        UserModel.findOne( //check if it's the first time
          { facebookID: profile.id },

          (err, userFromDb) => {
              if (err) {
                  done(err);
                  return;
              }

              if (userFromDb) { //if returning, log them in
                  done(null, userFromDb);
                  return;
              }

              const theUser = new UserModel({ //if not make an account
                  facebookID: profile.id,
                  name: profile.displayName
              });

              theUser.save((err) => {
                  if (err) {
                      done(err);
                      return;
                  }

                  done(null, theUser);
              });
          }
        );
    }
  )
);
