const router = require('express').Router()
const UserControllers = require('../controllers/UserControllers')
const PATHS = require('./paths')

router.get(PATHS.PROFILE_PATH, UserControllers.profileGet)

module.exports = router