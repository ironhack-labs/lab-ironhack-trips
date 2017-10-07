const express = require("express")
const passport = require('passport')
const authRoutes = express.Router()
const ensureLogin = require('connect-ensure-login')

const User = require('../models/users')
const Trip = require('../models/trips')

// ======= LANDING PAGE =======
authRoutes.get('/', (req, res, next) => {
  res.render('index')
})

// ======= AUTH ROUTES =======
authRoutes.get("/auth/facebook", passport.authenticate("facebook"))

authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}))

// ======= MY TRIPS PAGE =======
authRoutes.get('/my-trips', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  let user = req.user
  Trip.find({
    userID: req.user._id
  }, (error, trips) => {
    if (error) throw error
    else res.render('myTripsPage', {
      user,
      trips
    })
  })
})

// ======= NEW TRIP PAGE (GET) =======
authRoutes.get('/my-trips/new', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  res.render('newtrip')
})

// ======= NEW TRIP PAGE (POST) =======
authRoutes.post('/my-trips/new', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  let newTrip = new Trip({
    userID: req.user._id,
    user_displayname: req.user.displayName,
    destination: req.body.destination,
    description: req.body.description,
    pic_path: 'todo'
  })

  newTrip.save((error, newTrip) => {
    if (error) throw error
    else res.redirect('/my-trips')
  })
})

// ======= EDIT TRIP PAGE (GET) =======
authRoutes.get('/my-trips/edit/:trip_id', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  Trip.findById(req.params.trip_id, (error, trip) => {
    if (error) throw error
    else res.render('edittrip', {
      trip
    })
  })
})

// ======= EDIt TRIP PAGE (POST) =======
authRoutes.post('/my-trips/edit/:trip_id', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  let updatedTrip = {
    destination: req.body.destination,
    description: req.body.description
  }
  Trip.update({
    _id: req.params.trip_id
  }, updatedTrip, (error, trip) => {
    if (error) throw error
    else res.redirect('/my-trips')
  })
})

// ======= DELETE TRIP (GET) =======
authRoutes.get('/my-trips/delete/:trip_id', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  Trip.findById(req.params.trip_id, (error, trip) => {
    if (error) throw error
    else res.render('deletetrip', {
      trip
    })
  })
})

// ======= DELETE TRIP (POST) =======
authRoutes.post('/my-trips/delete/:trip_id', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  let user_action = req.body.button
  if (user_action === 'no') res.redirect('/my-trips')
  if (user_action === 'yes') {
    Trip.findOneAndRemove({
      _id: req.params.trip_id
    }, (error) => {
      if (error) throw error
      else res.redirect('/my-trips')
    })
  }
})

// ======= USER PROFILE PAGE =======
authRoutes.get('/profile/:user_id', (req, res, next) => {
  Trip.find({
    userID: req.params.user_id
  }, (error, trips) => {
    if (error) throw error
    else {
      User.find({
        _id: req.params.user_id
      }, (error, userArray) => {
        if (error) throw error
        else {
          let user = userArray[0]
          res.render('userprofile', {
          trips,
          user
        })}
      })
    }
  })
})

module.exports = authRoutes