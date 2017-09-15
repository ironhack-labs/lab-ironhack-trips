const passport = require('passport')
const PATHS = require('../routes/paths')

module.exports = {
  facebook: passport.authenticate("facebook"),
  facebookCallback: passport.authenticate("facebook", {
    successRedirect: PATHS.MYTRIPS_PATH,
    failureRedirect: PATHS.ROOT_PATH
  })
}