const express = require('express');
const router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
})

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/my-trips",
    failureRedirect: "/"
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;