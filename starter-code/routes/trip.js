const express = require("express");
const Trip = require("../models/trip");

const router = express.Router();

//LIST ALL TRIPS

router.get("/my-trips", (req, res, next) => {
  Trip.find({}, (err, trips) => {
    if (err) {
      return next(err);
    }
    res.render("my-trips/index", {
      trips: trips
    });
  });
});

//CREATE NEW TRIP

router.get("/my-trips/new", (req, res, next) => {
  res.render("my-trips/new");
});

router.post("/my-trips", (req, res, next) => {
  const tripInfo = {
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: req.body.pic_path
  };
  // Create a new trip with the params
  const newTrip = new Trip(tripInfo);
  // Save the product to the DB
  newTrip.save(err => {
    if (err) {
      return next(err);
    }
    return res.redirect("/my-trips");
  });
});

// EDIT TRIP

router.get("/my-trips/edit/:trip_id", (req, res, next) => {
  const tripId = req.params.id;

  Trip.findById(tripId, (err, trip) => {
    if (err) {
      return next(err);
    }
    res.render("my-trips/edit", { trip: trip });
  });
});

router.post("/my-trips/edit/:trip_id", (req, res, next) => {
  const TripId = req.params.id;

  const updates = {
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: req.body.pic_path
  };

  Trip.findByIdAndUpdate(tripId, updates, (err, trip) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/my-trips");
  });
});

//DELETE TRIP

router.get("/my-trips/delete/:trip_id", (req, res, next) => {
  const tripId = req.params.id;

  Trip.findById(tripId, (err, trip) => {
    if (err) {
      return next(err);
    }
    res.render("my-trips/delete", { trip: trip });
  });
});

router.post("/my-trips/delete/:trip_id", (req, res, next) => {
  const id = req.params.id;

  Trip.findByIdAndRemove(id, (err, trip) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/my-trips");
  });
});

module.exports = router;
