const express = require("express");
const session = require("express-session");
// const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const multer = require('multer');
const User = require('./models/User');
const picture = require('./models/Picture');
const trip = require('./models/Trip');
const FbStrategy = require('passport-facebook').Strategy;


// Controllers

// Mongoose configurations
mongoose.connect("mongodb://localhost/ironhack-trips");

const app = express();

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new FbStrategy({
  clientID: 400507863711039,
  clientSecret: 'b7ed00a036595bf0433014dd17890f80',
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

// Access POST params with body parser
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules/')));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication
app.use(session({
  secret: "ironhack trips"
}));
app.use(cookieParser());

// Routes
const trips = require('./routes/trip');
const auth = require('./routes/facebookAuth');
app.use("/", auth);
app.use("/", trips);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
