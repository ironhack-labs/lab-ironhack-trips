const router = require('express').Router()
const UserControllers = require('../controllers/UserControllers')
const { ensureLoggedIn } = require('connect-ensure-login'); 
const PATHS = require('./paths')

router.get(PATHS.MYTRIPS_PATH, ensureLoggedIn(), UserControllers.mytripsGet)

router.get(PATHS.MYTRIPS_NEW_PATH, ensureLoggedIn(), UserControllers.mytripsNewGet)
// router.post(PATHS.MYTRIPS_NEW_PATH, ensureLoggedIn(), UserControllers.mytripsNewPost)

// router.get(PATHS.MYTRIPS_EDIT_PATH, ensureLoggedIn(), UserControllers.mytripsEditGet)
// router.post(PATHS.MYTRIPS_EDIT_PATH, ensureLoggedIn(), UserControllers.mytripsEditPost)

// router.get(PATHS.MYTRIPS_DELETE_PATH, ensureLoggedIn(), UserControllers.mytripDeleteGet)
// router.post(PATHS.MYTRIPS_DELETE_PATH, ensureLoggedIn(), UserControllers.mytripDeletePost)

router.get(PATHS.LOGOUT_PATH, ensureLoggedIn(), UserControllers.logout)

module.exports = router