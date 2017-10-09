require('dotenv').config()
const express = require("express");
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const bodyParser = require('body-parser');



const router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: "/mytrips", failureRedirect: '/login' }), )


router.get('/', (req, res, next) => {
	res.render('index')
})

router.get('/mytrips', ensureLoggedIn('/'), (req, res, next) => {
	const user = req.body.user
	Trip.find({ userID: req.user._id },
		(error, trips) => {
			if (error) throw error
			else res.render('mytrips', { user, trips })
		})
})

auth.post('/mytrips/new', ensureLoggedIn('/'), upload.single('image'), (req, res, next) => {

	const newTrip = new Trip({
		userID: req.user._id,
		displayName: req.user.displayName,
		destination: req.body.destination,
		description: req.body.description,
		filename: req.body,
		pic_path: `/uploads/${req.file.filename}`,
		pic_name: req.file.originalname
	})

	newTrip.save((err) => {
		res.render('mytrips', { newTrip });
	});
});

router.get('/mytrips/new', ensureLoggedIn('/'), (req, res, next) => {
	const user = req.body.user
	res.render('new', { user })
})

router.get('/mytrips/edit/:trip_id', ensureLoggedIn('/'), (req, res, next) => {
	Trip.find({ userID: req.params.user_id },
		(error, trips) => {
			if (error) throw error
			else {
				User.find({ _id: req.params.user_id },
					(error, userArray) => {
						if (error) throw error
						else {
							let user = userArray[0]
							res.render('edit', { trips, user })
						}
					})
			}
		})
})


router.post('/mytrips/edit/:trip_id', ensureLoggedIn('/'), (req, res, next) => {
	const user = req.body.user
	res.redirect('/mytrips', { user })
})

router.get('/mytrips/::trip_id/delete', ensureLoggedIn('/'), (req, res, next) => {
	const user = req.body.user
	res.render('delete', { user })
})

router.post('/mytrips/::trip_id/delete', ensureLoggedIn('/'), (req, res, next) => {
	const userLastWord = req.body.WhyDidIClickThen
	const user = req.body.user
	if (userLastWord) Trip.findOneAndRemove({ _id: req.params.trip_id }.catch(err => "disregard")).then(res.redirect('/mytrips'))
	else {
		res.redirect('/mytrips', { user })
	}
})

router.get('/:user_id', (req, res, next) => {
	Trip.find({ userID: req.params.user_id },
		(error, trips) => {
			if (error) throw error
			else {
				User.find({ _id: req.params.user_id },
					(error, userArray) => {
						if (error) throw error
						else {
							let user = userArray[0]
							res.render('profile', { trips, user })
						}
					})
			}
		})
})

module.exports = router;