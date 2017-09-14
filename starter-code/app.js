const express        = require("express");
const session        = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require("passport");
const flash          = require("connect-flash");
const MongoStore     = require("connect-mongo")(session);
const app            = express();

// Controllers
const index = require('./routes/index');
const auth  = require('./routes/auth');

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips", {useMongoClient:true})
        .then(()=> console.log("connected to db!"));

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());

// Authentication
app.use(session({
  secret: "ironhack trips",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 24 * 60 * 60
  })
}));
app.use(cookieParser());

require('./passport/config');
require('./passport/facebook');

app.use(passport.initialize());
app.use(passport.session());

//Title
app.use((req,res,next) =>{
  res.locals.title = "IronTrips";
  next();
});

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.use('/', index);
app.use('/', auth);


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
