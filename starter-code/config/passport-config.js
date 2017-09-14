const passport = require('passport');
const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');

const FbStrategy = require('passport-facebook').Strategy;

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

// Facebook Login ----------------------------------------

passport.use(
  new FbStrategy(
    {
      clientID: process.env.fb_app_id,
      clientSecret: process.env.fb_app_secret,
      callbackURL: '/auth/Facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {

      UserModel.findOne(
        { provider_id: profile.id },
        (err, userFromDb) => {
          if (err) {
            done(err);
            return;
          }

          if (userFromDb) {
            done(null, userFromDb);
            return;
          }

          const theUser = new UserModel({
            provider_id: profile.id,
            provider_name: profile.displayName
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
