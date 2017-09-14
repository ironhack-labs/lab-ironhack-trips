const passport = require('passport');


const UserModel = require('../models/user-model.js');

// "serializeUser" is called when the user logs in
passport.serializeUser((userFromDb, done) => {
    // tell passport we want to save the ID inside the session
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
          // give passport the user document from the database
          //              |
          done(null, userFromDb);
      }
    )
});

//-----------------------------------------------------------------
//
// STRATEGIES SETUP


const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy(
  { clientID: '845879468908337',
    clientSecret: '6719f66049ceea3266dac6dafe69239a',
    callbackURL: '/auth/facebook/callback'
  },
// Callback - after SUCCESSFUL Facebook Login
  (accessToken, refreshToken, profile, done) => {
      console.log('Facebook user info:');
      console.log(profile);

      UserModel.findOne(
        {provider_id: profile.id},

        (err, userFromDb) => {
            if(err) {
              done(err);
              return;
            }

            if (userFromDb) {
                done(null, userFromDb);
                return;
            }

            const theUser = new UserModel ({
                provider_id: profile.id,
                provider_name: profile.displayName
            });
            theUser.save((err) => {
                if(err) {
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
