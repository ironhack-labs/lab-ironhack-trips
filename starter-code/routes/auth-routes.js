const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user-model.js');


const router = express.Router();


router.get('/auth/facebook', passport.authenticate('facebook'));
// the "/auth/facebook/callback" URL is where the user will arrive after login
router.get('/auth/facebook/callback',
            // name of strategy    settings object
            //               |      |
  passport.authenticate('facebook', {
      successRedirect: '/my-trips',
      failureRedirect: '/login',
      failureFlash: true
  })
);




module.exports = router;
