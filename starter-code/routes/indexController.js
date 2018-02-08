const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/", (req, res, next) => {
	if (req.isAuthenticated()) {
		res.redirect('/my-trips');
	} else {
		res.render("home");
	}
});

router.get("/my-trips", ensureLoggedIn("/"), (req, res, next) => {
	res.render("trips/index");
});

module.exports = router;