const mongoose = require('mongoose');
const User = mongoose.model('User');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use( new FacebookStrategy({
        clientID: config.facebook.id,
        clientSecret: config.facebook.secret,
        callbackUrl: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'provider', 'photos']
    }, function (accessToken, refreshToken, profile, done) {

        User.findOne({ provider_id: profile.id }, function (err, user) {
            if (err) throw (err);
            if (!err && user != null) return done(null, user);

            let User = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            
            user.save(function (err) {
                if (err) throw err;
                done(null, user);
            });
        });
    }));

};

