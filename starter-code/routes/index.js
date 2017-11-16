const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip')

// THE INDEX SHOW ALL TRIPS IN THE WEBSITE.
router.get('/', (req,res) => {
  Trip.find({}, (err, trips) => {
      res.render('index', {trips: trips});
  });
});

router.get('/login', (req,res) => {
    res.redirect('/');
});

module.exports = router;
