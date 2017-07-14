const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Trip = require('../models/Trip');
const path = require('path');
const debug = require('debug')('travel-diaries:'+path.basename(__filename));

/* GET home page. */
router.get('/', ensureLoggedIn('/facebook'), (req, res, next) => {
  Trip.find({}, (err, trips) => {
    debug(trips);
  }).then( trips => res.render('trips/index', {user: req.user, trips: trips}))
    .catch(e => next(e));

});

router.get('/new', ensureLoggedIn('/facebook'), (req, res, next) => {
  res.render('trips/new');
});

router.post('/new', [ensureLoggedIn('/facebook'), upload.single('photo')], (req, res, next) => {
  const newTrip = Trip({
          user_id: req.user.id,
          user_name: req.user.provider_name,
          destination: req.body.destination,
          description: req.body.description,
          picPath: `uploads/${req.file.filename}`
        });

        debug(newTrip);

        newTrip.save((err) => {
          if (err) {
            res.redirect("/my-trips/new", {
              errorMessage: "Something went wrong"
            });
          } else {
            debug(`new trip created`);
            res.redirect("/my-trips");
          }
        });
});

router.get('/edit/:id', ensureLoggedIn('/facebook'), (req, res, next) => {
  Trip.findById(req.params.id, (err, trip) => {
      if(err){
        next();
        return err;
      }
      res.render('trips/edit', {trip: trip});
    });
});

router.post('/edit/:id', [ensureLoggedIn('/facebook'), upload.single('photo')], (req, res, next) => {
  let {destination, description} = req.body;
  let picPath = `uploads/${req.file.filename}`;
  let edits = {
    destination,
    description,
    picPath
  };

  Trip.findByIdAndUpdate(req.params.id, edits, (err, trip) => {
      if(err){
        next();
        return err;
      }
      res.redirect(`/my-trips`);
    });
});

router.get('/delete/:id', ensureLoggedIn('/facebook'), (req, res, next) => {
  Trip.findById(req.params.id, (err, trip) => {
      if(err){
        next();
        return err;
      }
      res.render('trips/delete', {trip: trip});
    });
});

router.get('/:id', ensureLoggedIn('/facebook'), (req, res, next) => {
  Trip.findByIdAndRemove(req.params.id, (err, obj) => {
    if (err){ return next(err); }
    res.redirect("/my-trips");
  });
});
module.exports = router;
