const express = require('express');
const router  = express.Router();
const Trip = require('../models/Trip');
const debug = require('debug')('ironhack-trips:campaign');
const User = require('../models/User');

const multer = require('multer');
const upload = multer({ dest: __dirname + '/../uploads' });

const ensureLoggedIn = (redirect_url) => {
  return (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.redirect(redirect_url)
    }
  }
}

/* CRUD -> CREATE FORM */
router.get('/new', ensureLoggedIn('/auth/login'),(req, res) => {
  let user = req.user;
  res.render('trips/new');
});

/* CRUD -> CREATE DATABASE */
router.post('/new', [ensureLoggedIn('/auth/login'), upload.single('image')], (req, res, next) => {

  const { destination, description, pic_path } = req.body;

  const newTrip = new Trip({
    user_id: req.user._id,
    user_name: req.user.username,
    destination,
    description,
    pic_path: req. file.filename
  });

  newTrip.save().then(c => {
    debug('Created trip');
    res.redirect('/');
  })
    .catch(e => {
      debug('Error creating trip');
      res.redirect('/trips/new');
    })
});

module.exports = router;