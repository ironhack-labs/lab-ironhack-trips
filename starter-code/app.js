const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


// Rutas a controladores
let indexAuth = require('./routes/auth');

// Configuración mongoose
mongoose.connect("mongodb://localhost/ironhack-trips", {useMongoClient: true});

// Middlewares configuration
app.use(logger("dev"));

// Configuración de views y layout
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Autenticación de la sesión
app.use(session({
  secret: "ironhacktrips",
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
require('./passport')(app);

// Middlewares de rutas
app.use("/", indexAuth);

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
