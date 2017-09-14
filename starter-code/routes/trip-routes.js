const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('passport');



const TripModel = require('../models/trip-model.js');

const router = express.Router();

const myUploader = multer(
  // 1st. settings object
  {
    // destination --> from current folder
    dest: __dirname + '/../public/uploads/'
  }
);

router.get('/my-trips', (req,res,next) => {

  if (req.user === undefined) {
  req.flash('securityError', 'Log in to add a trip.');
  res.redirect('/');
  return;
}

TripModel.find(
  { user_id:  req.user._id },
  (err, myTrips) => {


      if (err) {
        next(err);
        return;
      }

      res.locals.securityFeedback = req.flash('securityError');
      res.locals.updateFeedback = req.flash('updateSuccess');
      res.locals.listOfTrips = myTrips;
      res.locals.user = req.user;

      res.render('trips/index.ejs');
  }
);

});

router.get('/my-trips/new', (req,res,next) => {
    res.render('trips/new.ejs');
});

router.post(
  '/my-trips/new',
  // roomPhoto comes from form
  myUploader.single('photo'),

  (req,res,next) => {
    if (req.user === undefined) {
      req.flash('securityError', 'Log in to add a trip.');
      res.redirect('/');
      return;
    }

    // multer creates req.file with all the file info
    console.log('req.file --------->   ' );
    console.log(req.file);

    const theTrip = new TripModel({
        user_id: req.user._id,
        user_name: req.user.provider_name,
        destination: req.body.destination,
        description: req.body.description,
        pic_path: '/uploads/' + req.file.filename
    });

    theTrip.save((err) => {
        if (err) {
          next(err);
          return;
        }

        req.flash('tripFeedback','Trip added.');

        res.redirect('/my-trips');
    });
});


router.get('/my-trips/edit/:trip_id', (req,res,next) => {

  TripModel.findById(
      req.params.trip_id,
      (err, tripFromDb) => {
        if (err) {
          next(err);
          return;
        }

        // redirect to myrooms if you don't own this room
        /*if (roomFromDb.owner.toString() !== req.user._id.toString()) {
          req.flash('securityError', 'You can only edit your rooms.');
          res.redirect('/my-rooms');
          return;
        }*/


        res.locals.tripInfo = tripFromDb;

        res.render('trips/edit.ejs');
      }
  );

});

router.post('/my-trips/edit/:trip_id',
    myUploader.single('photo'),
    (req,res,next) => {

      TripModel.findById(
      req.params.trip_id,
      (err, tripFromDb) => {
          if (err) {
            next(err);
            return;
          }

          tripFromDb.destination = req.body.destination;
          tripFromDb.description = req.body.description;

          // check if req.file, cause it will be undefined if user doesn't
          // upload anything
          if (req.file) {
            tripFromDb.pic_path = '/uploads/'+req.file.filename;
          }

          tripFromDb.save((err) => {
            if (err) {
              next(err);
              return;
            }

            req.flash('updateSuccess','Trip update successful.');
            res.redirect('/my-trips');
          });
      }
    );

});

router.get('/my-trips/delete/:trip_id', (req,res,next) => {

  TripModel.findById(
      req.params.trip_id,
      (err, tripFromDb) => {
        if (err) {
          next(err);
          return;
        }

        // redirect to myrooms if you don't own this room
        /*if (roomFromDb.owner.toString() !== req.user._id.toString()) {
          req.flash('securityError', 'You can only edit your rooms.');
          res.redirect('/my-rooms');
          return;
        }*/


        res.locals.tripInfo = tripFromDb;

        res.render('trips/delete.ejs');
      }
  );

});

router.post('/my-trips/delete/:trip_id', (req,res,next) => {
      TripModel.findByIdAndRemove(req.params.trip_id, (err,todo) => {

      if (err) {
        next(err);
        return;
      }

      res.redirect('/my-trips');

    });
});

router.get('/public-profile/:id', (req,res,next) => {

  TripModel.find(
    { user_id:  req.params.id },
    (err, trips) => {


        if (err) {
          next(err);
          return;
        }

        res.locals.securityFeedback = req.flash('securityError');
        res.locals.updateFeedback = req.flash('updateSuccess');
        res.locals.listOfTrips = trips;

        res.render('trips/public.ejs');
    });


});



















module.exports = router;
