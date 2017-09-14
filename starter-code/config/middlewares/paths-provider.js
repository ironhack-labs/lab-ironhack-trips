const resolve = require('../../utils/resolve');
const PATHS = require('../../routes/paths');

module.exports = (req, res, next) => {
  res.locals.resolve = resolve;
  res.locals.PATHS = PATHS;
  next();
}