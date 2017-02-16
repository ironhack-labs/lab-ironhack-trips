const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/my-trips.ejs',
  failureRedirect: '/'
}));

// router.get('/auth/facebook', passport.authenticate('facebook', {
//   session: false,
//   scope: []
// }));
//
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     session: false,
//     failureRedirect: "/"
//   }),
//   function(req, res) {
//     res.redirect("/profile?access_token=" + req.user.access_token);
//   }
// );

module.exports = router;
