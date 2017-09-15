const express = require('express');
const multer = require('multer');
const TripModel = require('../models/trip-model.js');

const router = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads/'
  }
);


router.get('/my-trips/new', (req, res, next) => {
  res.render('trip-views/trip-form.ejs');
});


router.post('/my-trips/new',
  myUploader.single('tripPhoto'),
  (req, res, next) => {
    const newTrip = new TripModel({
      user_id: req.user._id,
      user_name: req.user.provider_name,
      destination: req.body.tripDest,
      description: req.body.tripDesc,
      pic_path: '/uploads/' + req.file.filename
    });

    newTrip.save((err) => {
      if(err) {
        next(err);
        console.log(err);
        return;
      }
      res.redirect('/my-trips');
    });
  }
);

router.get('/my-trips', (req, res, next) => {
  TripModel.find(
    // {provider_id: profile.id},

    (err, myTrips) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.listOfTrips = myTrips;

      res.render('trip-views/my-trips.ejs');
    }
  );
});

router.get('/my-trips', (req, res, next) => {
  res.render('trip-views/my-trips.ejs');
});


router.get('/my-trips/:tripId/edit', (req, res, next) => {
  TripModel.findById(
    req.params.tripId,
    (err, tripFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.tripInfo = tripFromDb;
      res.render('trip-views/trip-edit.ejs');
      }
  );
});

router.post('/my-trips/:tripId',
  myUploader.single('tripPhoto'),

  (req, res, next) => {
    TripModel.findById(
      req.params.tripId,

      (err, tripFromDb) => {
        if(err){
          next(err);
          return;
        }

        tripFromDb.dest = req.body.tripDest;
        tripFromDb.desc = req.body.tripDesc;

        if(req.file){
          tripFromDb.pic_path = '/uploads/' + req.file.filename;
        }

      tripFromDb.save((err) => {
        if (err) {
          next(err);
          return;
        }
        res.redirect('/my-trips');
      });
    }
  );
});

module.exports = router;
