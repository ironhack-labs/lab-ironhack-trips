const passport = require('passport');

const UserModel = require('../models/user-model.js');

passport.serializeUser((userFromDb, done) => {
      // tell passport we want to save the ID inside the session
      //                   |
    done(null, userFromDb._id);
      //   |
      // "null" as the first argument means "no error" (good)
});

passport.deserializeUser((idFromBowl, done) => {
    UserModel.findById(
      idFromBowl,

      (err, userFromDb) => {
          // if there's a database error, inform passport.
          if (err) {
              done(err);
              return;
          }

            // give passport the user document from the database
            //            |
          done(null, userFromDb);
            //   |
            // "null" as the first argument means "no error" (good)
      }
    );
});



const FbStrategy = require('passport-facebook').Strategy;

// "passport.use()" sets up a new strategy
passport.use(
  new FbStrategy(
    // 1st arg -> settings object
    {
        // clientID = App ID
        clientID: process.env.fb_app_id,
        // clientSecret = App Secret
        clientSecret: process.env.fb_app_secret,
        callbackURL: '/auth/facebook/callback'
    },

    // 2nd arg -> callback
    // gets called after a SUCCESSFUL Facebook login
    (accessToken, refreshToken, profile, done) => {
        console.log('Facebook user info:');
        console.log(profile);

        // check to see if it's the first time they log in
        UserModel.findOne(
          { facebookID: profile.id },

          (err, userFromDb) => {
              if (err) {
                  done(err);
                  return;
              }

              // if the user already has an account, GREAT! log them in.
              if (userFromDb) {
                  done(null, userFromDb);
                  return;
              }

              // if they don't have an account, make one for them.
              const theUser = new UserModel({
                  facebookID: profile.id,
                  email: profile.displayName
              });

              theUser.save((err) => {
                  if (err) {
                      done(err);
                      return;
                  }

                  // if save is successful, log them in.
                  done(null, theUser);
              });
          }
        ); // close UserModel.findOne( ...
    }
  ) // close new FbStrategy( ...
);
