const express = require('express');
const passport = require('passport');

const UserModel = require('../models/user-model.js');

const router = express.Router();

router.get('/login', (req,res, next) => {

  if (req.user) {
    res.redirect('/');
    return;
  }

  res.locals.flashError = req.flash('error');
  res.locals.logoutFeedback = req.flash('logoutSuccess');
  res.locals.securityFeedback = req.flash('securityError');
  res.render('../login-views/login.ejs');
});


// link to "auth/facebook" to take user to FB website to login
router.get('/auth/facebook', passport.authenticate('facebook'));


router.get('/auth/facebook/callback',
    passport.authenticate('facebook',
    {
      successRedirect: '/login-views/login.ejs',
      failureRedirect: '/',
      failureFlash: true
    })
);




module.exports = router;
