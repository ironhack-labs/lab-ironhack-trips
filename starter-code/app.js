const express = require("express");
const session = require("express-session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const debug = require("debug");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

// Controllers

// Mongoose configuration
const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost/ironhack-trips";
mongoose.connect(databaseURL, {useMongoClient: true}, () => debug(`Connected to db: ${databaseURL}`));

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.static(path.join(__dirname, "public")));

app.use(logger('combined'));
// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(cookieParser());
app.use(session({
  secret: "ironhack trips",
  resave: true,
  saveUninitialized: true
}));

// Passport configuration
require('./config/passport');
require('./config/passport-facebook');
app.use(passport.initialize());
app.use(passport.session());

// Locals Middleware
app.use((req,res,next) => {
  res.locals.user = req.user;
  next();
});

// Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const trips = require('./routes/trips');
app.use('/', index);
app.use('/', auth);
app.use('/my-trips', trips);

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
