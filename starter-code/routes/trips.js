const router  = require('express').Router();

/* GET home page. */
router.get('trips', (req, res, next) => {
  res.render('/trips');
});


module.exports = router;
