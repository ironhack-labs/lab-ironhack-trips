const express = require('express');
const passport   = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');
const multer= require("multer")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var upload = multer({ dest: './public/images/' });
/* GET home page. */
router.route('/')
	.get((req, res, next) => {
        if (req.user){

        res.render('index');
        } else {

        res.redirect('/login');
        }
})

router.get('/login', ensureLoggedOut("/mytrips"), (req, res, next) => {
        res.render('login');
})

router.get('/ourtrips', (req, res, next) => {
    Trip.find({}, (err, trips)=>{ 
        res.render('trips', {trips});
    })
})

router.get('/ourtrips/:id', (req, res, next) => {
    Trip.findOne({_id: req.params.id}, (err, trip)=>{ 
        res.render('show', {trip, logged: false});
    })
})

router.get('/mytrips', ensureLoggedIn(), (req, res, next) => {
    Trip.find({user_id: req.user.provider_id}, (err, trips)=>{ 
        res.render('index', {trips});
    })
})

router.get('/mytrips/new', ensureLoggedIn(), (req, res, next) => {
    res.render('new');
})

router.post('/mytrips/new', upload.single('photo'), (req, res, next) => {
    if (req.user){

        const trip = new Trip({
            user_id: req.user.provider_id,
            user_name: req.user.provider_name,
            destination: req.body.destination,
            description: req.body.description,
            pic_path: `/images/${req.file.filename}`
          });
        
          trip.save((err) => {
              if (err) {
                  next()
              } else {
                  res.redirect("/mytrips")
              }
          });
        } else {

        res.redirect('/login');
        }
   
})

router.get('/mytrips/:id', ensureLoggedIn(), (req, res, next) => {
    Trip.findOne({_id: req.params.id}, (err, trip)=>{ 
        if (trip.user_id===req.user.provider_id){
            res.render('show', {trip, logged: true});
        } else {
            res.render('show', {trip, logged: false});
        }
    })
})

router.get('/mytrips/:id/edit', ensureLoggedIn(), (req, res, next) => {
    Trip.findOne({_id: req.params.id}, (err, trip)=>{ 
        if (trip.user_id===req.user.provider_id){
            res.render('edit', {trip});
        } else {
            res.redirect("/mytrips/"+req.params.id)
        }
    })
})

router.post('/mytrips/:id/edit', upload.single('photo'), (req, res, next) => {
    Trip.findOne({_id: req.params.id}, (err, trip)=>{ 
        if (req.user){
                trip.destination= req.body.destination;
                trip.description= req.body.description;
                if (req.file){

                trip.pic_path= `/images/${req.file.filename}`
                }
            
              trip.save((err) => {
                  if (err) {
                      next()
                  } else {
                      res.redirect("/mytrips")
                  }
              });
            } else {
    
            res.redirect('/login');
            }
    })
})

router.get('/mytrips/:id/delete', ensureLoggedIn(), (req, res, next) => {
    Trip.findOne({_id: req.params.id}, (err, trip)=>{ 
        if (trip.user_id===req.user.provider_id){
            res.render('delete', {trip});
        } else {
            res.redirect("/mytrips/"+req.params.id)
        }
    })
})

router.get('/mytrips/:id/deleteTrue', ensureLoggedIn(), (req, res, next) => {
    Trip.findByIdAndRemove({_id: req.params.id}, (err, trip)=>{ 
            res.redirect("/mytrips/")
    })
})


module.exports = router;