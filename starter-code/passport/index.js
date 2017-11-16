const passport = require("passport");
require('./googleStrategy');
require('./serializers');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
