const router = require('express').Router()
const AuthControllers = require('../controllers/AuthControllers')
const PATHS = require('./paths')

router.get(PATHS.FACEBOOK_PATH, AuthControllers.facebook)
router.get(PATHS.FACEBOOK_CALLBACK_PATH, AuthControllers.facebookCallback)

module.exports = router