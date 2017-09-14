const express        = require("express");
const session        = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require('passport');
// const flash          = require('connect-flash');
const app            = express();

// Controllers

require('./config/passport-config.js');

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips");

// Middlewares configuration
app.locals.title = 'Trips';
app.use(logger("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
    if(req.user)
      {res.locals.currentUser = req.user;}
    else
      {res.locals.currentUser = null;}
    next ();
});

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(session({
  secret: "ironhack trips",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());

// Routes
const index = require('./routes/index');
app.use("/", index);

const myUserRoutes = require('./routes/login-router');
app.use(myUserRoutes);

const myTripRoutes = require('./routes/trips-router.js');
app.use(myTripRoutes);

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
