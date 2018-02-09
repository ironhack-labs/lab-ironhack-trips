const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Trip = require("../models/Trip");

const ensureLoggedIn = redirectTo => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(redirectTo);
    }
  };
};

router.get("/new", ensureLoggedIn("/"), (req, res, next) => {
  res.render("trips/new");
});

router.post("/new", [ensureLoggedIn("/auth/login"), upload.single("image")], (req, res, next) => {
    const user_id = req.user._id;
    
    const { destination, description } = req.body;
    User.findById(user_id)
      .populate("provider_name")
      .then((err, user) => {
        console.log(user)
        const newTrip = new Trip({
          destination,
          description,
          user_id,
          provider_name: user.provider_name,
          pic_path: req.file.filename
        });
        
        newTrip.save().then(c => {
            res.redirect("/index");
          })
          .catch(e => {
            res.redirect("/trips/new");
          });
      })
      .catch(e => next(e));
  }
);

module.exports = router;