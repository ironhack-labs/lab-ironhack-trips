const express = require("express");
const path = require("path");
const favicon = require('serve-favicon');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const debug = require('debug')(`trips:${path.basename(__filename).split('.')[0]}`);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo')(session);
const app = express();

// Controllers
const authFacebook = require('./routes/authFacebook');
const index = require('./routes/index');
const privateTrip = require('./routes/privateTrip');

// Mongoose configuration
const dbURL = "mongodb://localhost/ironhack-trips";
mongoose.connect(dbURL).then(() => {
  debug(`Connected to DB: ${dbURL}`);
});

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");
app.use(expressLayouts);

app.use(session({
  secret: "express-passport",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection }),
}));

app.use(flash());
require('./passport')(app);

app.use((req,res,next) =>{
  res.locals.title = "Trips";
  res.locals.user = req.user;
  next();
});

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', index);
app.use('/authFacebook', authFacebook);
app.use('/privateTrip', privateTrip);

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
