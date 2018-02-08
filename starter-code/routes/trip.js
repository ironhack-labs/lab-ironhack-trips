const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Trip = require('../models/Trip')
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../uploads' });

router.get('/my-trips', ensureLoggedIn("/"), (req, res, next) => {
    Trip.find()
    .then(trips => res.render('my-trips', { trips: trips }))
    .catch(e => next(e));
})

router.get('/createatrip', ensureLoggedIn("/"), (req, res, next) => {
    res.render('createatrip');
})

router.post('/createtrip', [ensureLoggedIn('/'), upload.single('picpath')], (req, res, next) => {

    const { user_name, destination, description} = req.body;

    const newTrip = new Trip({
        user_name, destination, description, 
        creator_id: req.user._id,
        pic_path: req.file.filename
    });

    newTrip.save().then(c => {
        res.redirect('/my-trips');
    })
        .catch(e => {
            res.redirect('/');
        })
});


module.exports = router;