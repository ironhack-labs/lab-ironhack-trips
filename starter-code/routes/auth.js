const router = require('express').Router()
const AuthControllers = require('../controllers/AuthControllers')
const { ensureLoggedOut } = require('connect-ensure-login'); 
const PATHS = require('./paths')

router.get(PATHS.FACEBOOK_PATH, ensureLoggedOut(), AuthControllers.facebook)
router.get(PATHS.FACEBOOK_CALLBACK_PATH, ensureLoggedOut(), AuthControllers.facebookCallback)

module.exports = router