const express = require('express');
const multer = require('multer');

const TripModel = require('../models/trip-model.js');

const router = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads/'
  }
);

router.get('/my-trips', (req, res, next) => {

      TripModel.find(
        { user_id: req.user._id },

          (err, myTrips) => {
              if(err) {
                next(err);
                return;
              }

              res.locals.listOfTrips = myTrips;
          }
      );
  res.render('/views/trips/index.ejs');
});

router.get('/my-trips/new', (req, res, next) => {
  res.render('/views/trips/new.ejs');
});

router.post('/my-trips/new', myUploader.single('tripPhoto'), (req, res, next) => {

      const theTrip = new TripModel (
        {
          user_id: req.user._id,
          user_name: req.user.displayName,
          destination: req.body.tripDest,
          description: req.body.tripDesc,
          pic_path: '/uploads/' + req.file.filename
        }
      );

      theTrip.save((err) => {
          if (err){
            next(err);
            return;
          }
          // req.flash('tripFeedback', 'Trip Added')
          res.redirect('/my-trips');
      });
});


router.get('/my-trips/edit/:trip_id', (req, res, next) => {

    TripModel.findById (
      req.params.tripId,

      (err, roomFromDb) => {
          if (err) {
            next(err);
            return;
          }

        res.locals.tripInfo = tripFromDb;
        res.render('views/trips/edit.ejs');
      }
    );
});

router.post('/my-trips/edit/:trip_id', myUploader.single('tripPhoto'), (req,res,next) => {
    TripModel.findById(
      req.params.tripId,

      (err, tripFromDb) => {
          if (err){
            next(err);
            return;
          }

          tripFromDb.destination = req.body.tripDest;
          tripFromDb.description = req.body.tripDesc;
          tripFromDb.pic_path = '/uploads/' + req.file.filename;

          tripFromDb.save((err) => {
              if (err) {
                next (err);
                return;
              }
              req.flash('updateSucess', 'Updated Trips');
              res.redirect('/my-trips');
          });


      }
    );
});


module.exports = router;
