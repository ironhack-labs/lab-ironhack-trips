const express        = require("express");
const expressLayouts = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const app            = express();
const debug = require('debug')(`irontrips:server`)('travel-diaries:server');
const passport = require ('passport');
const session = require (`express-session`);
const MongoStore = require(`connect-mongo`)(session);

// Controllers
const index = require('./routes/index');
const authController = require('./routes/auth');
const tripController = require('./routes/my-trips');

// Mongoose configuration
const dbUrl =  "ironhack-trips";
mongoose.connect(`mongodb://localhost/${dbUrl}`).then(() => {
  debug(`Connected to ${dbUrl}`)
});

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "main-layout");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Autentication
// Utiliza express-session y connect-mongo (y mongoose) para crear las cookies de sesion y guardarlas en la DB
app.use(session({
  secret: "express-passport",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection : mongoose.connection}),
}));
// Usa el modulo passport-facebook para login y creacion de usuarios desde la carpeta social/facebook.js
require('./social/facebook')(app);

// Routes
app.use("/", index);
app.use('/auth', authController);
app.use('/my-trips', tripController);




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
