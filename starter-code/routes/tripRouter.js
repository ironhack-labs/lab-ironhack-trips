const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');

const UserModel = require('../models/user-model.js');
const TripModel = require('../models/trip-model.js');

const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});

router.get('/my-trips', (req,res,next)=>{
  if(!req.user){
    res.locals.tripsList = [];
    res.render('trips/tripslist');
  }
  
  TripModel.find(
    {owner:req.user._id},
    (err,tripListFromDb)=>{
    if(err){
      next(err);
      return;
    }
    console.log(tripListFromDb);
    res.locals.tripsList = tripListFromDb;
    res.render('trips/tripslist');
  })
});

router.get('/my-trips/new', (req,res,next)=>{
  res.render('trips/trip-form');
});

router.post('/trip-process',
myUploader.single('tripPhoto'),
  (req,res,next)=>{
    const newTrip = new TripModel ({
      name: req.body.tripName,
      pic_path: '/uploads/' + req.file.filename,
      destination: req.body.destination,
      description: req.body.description,
      owner: req.user._id
    })
    newTrip.save((err)=>{
      if(err){
        next(err);
        return;
      }
      console.log("Saved.");
      res.redirect('/my-trips');
    });
});

router.get('/my-trips/edit/:trip_id', (req,res,next)=>{
  TripModel.findById(
    req.params.trip_id,
    (err, tripFromDb)=>{
      if(err){
        next(err);
        return;
      }
      res.locals.trip = tripFromDb;
      res.render('trips/trip-edit');
    }
  );
});

router.post('/my-trips/edit/:trip_id',
  myUploader.single('tripPhoto'),
  (req,res,next)=>{
      TripModel.findById(
        req.params.trip_id,

        (err, tripFromDb)=>{
          if(err){
            next(err)
            return;
          }

          if (tripFromDb.owner.toString() !== req.user._id.toString()) {
            req.flash('securityError', 'You can only edit your rooms.');
            res.redirect('/my-trips');
            return;
          }
        tripFromDb.name = req.body.tripName;
        tripFromDb.destination = req.body.destination;
        tripFromDb.description = req.body.description;
          if(req.file)
            tripFromDb.pic_path = '/uploads/' + req.file.filename;

        tripFromDb.save((err)=>{
          if(err){
            next(err);
            return;
          }
          res.redirect('/my-trips');
        });
        }
      )
});
module.exports = router;
