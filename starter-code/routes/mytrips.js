const express  = require('express');
const Trip    = require('../models/Trip');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const User = require ("../models/User.js");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


const {authorizeTrip} = require ("../middlewares/authTrip.js")


router.get('/new', (req, res) => {
    res.render('trips/new');
  });


router.post('/new', ensureLoggedIn('/'),upload.single('photo'), (req, res, next) => {
    const newTrip = new Trip({
      user_id: req.user._id,
      //user_name  : { type: Schema.Types.ObjectId, ref: 'User', required: true },
      destination: req.body.destination,
      description: req.body.description,
      pic_path   : `/uploads/${req.file.filename}`
    });
  
    newTrip.save()
      .then(tripCreated => res.redirect(`/`))
      .catch(err => res.render("error"));
  });


module.exports = router;





