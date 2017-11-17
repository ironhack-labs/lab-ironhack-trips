const router = require('express').Router();
const multer = require('multer');
const upload = multer({
  dest: './uploads/'
});
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');
const Trip = require('../models/Trip');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
  Trip.find({user_id : req.user._id})
  .then((trips) => {
    return res.render('trips/index', {trips});
  })
  .catch(err => next(err));
});

router.get('/new', (req, res, next) => {
  res.render('trips/new');
});

router.post('/new', ensureLoggedIn('/login'), upload.single('picture'), (req, res, next) => {
  new Trip({
      user_id: req.user._id,
      user_name: req.user.provider_name,
      destination: req.body.destination,
      description: req.body.description,
      pic_path: req.file ? `/uploads/${req.file.filename}` : ''
    })
    .save()
    .then(() => { return res.redirect('/my-trips');})
    .catch(err => next(err));
});

router.get('/edit/:trip_id', ensureLoggedIn('/login'), (req, res, next) => {
  Trip.findById(req.params.trip_id)
    .then((trip) => {
      res.render('trips/edit', {trip});
    })
    .catch(err => next(err));
});

router.post('/edit/:trip_id', ensureLoggedIn('/login'), upload.single('picture'), (req, res, next) => {
  let tripInfo = {
    user_id: req.user._id,
    user_name: req.user.provider_name,
    destination: req.body.destination,
    description: req.body.description
  };
  if (req.file) tripInfo.pic_path = `/uploads/${req.file.filename}`;
  Trip.findByIdAndUpdate(req.params.trip_id, { $set: tripInfo })
    .then(() => { return res.redirect('/my-trips');})
    .catch(err => next(err));
});

router.get('/delete/:trip_id', ensureLoggedIn('/login'), (req, res, next) => {
  Trip.findById(req.params.trip_id)
    .then((trip) => {
      res.render('trips/delete', {trip});
    })
    .catch(err => next(err));
});

router.post('/delete/:trip_id', ensureLoggedIn('/login'), (req, res, next) => {
  Trip.findByIdAndRemove(req.params.trip_id)
  .then(() => { return res.redirect('/my-trips');})
  .catch(err => next(err));
});

module.exports = router;
