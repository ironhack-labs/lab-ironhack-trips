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
      });
});

const FbStrategy = require('passport-facebook').Strategy;


passport.use(
  new FbStrategy({
        clientID: '1723451607674011',
        clientSecret: 'fb3935b3e75c464fedb33d841484d497',
        callbackURL: '/auth/facebook/callback',
    },

    (accessToken, refreshToken, user, done) => {
        UserModel.findOne(
          { provider_id: user.id },
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
                  provider_id: user.id,
                  provider_name: user.displayName
              });

              theUser.save((err) => {
                  if (err) {
                      done(err);
                      return;
                  }
                  done(null, theUser);
              });
          });
    }));
