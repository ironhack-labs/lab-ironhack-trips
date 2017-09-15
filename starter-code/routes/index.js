const router = require('express').Router()
const IndexControllers = require('../controllers/IndexControllers')
const PATHS = require('./paths')

router.get(PATHS.ROOT_PATH, IndexControllers.home)

module.exports = router