const express        = require("express");
const session        = require("express-session");
const layouts        = require("express-ejs-layouts");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const MongoStore     = require('connect-mongo')(session);
const app            = express();

// Controllers
const auth           = require("./routes/auth");
const mytrips        = require("./routes/mytrips");
const index          = require('./routes/index');
// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips");

app.locals.title = 'Express - Generated with IronGenerator';

// Middlewares configuration
app.use(logger('dev'));

// View engine configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set("layout", "layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use('/dist/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/dist/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Authentication
app.use(session({
  secret: 'ironfundingdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

require ("./config/passport")(app)

// Routes
app.use("/", index);
app.use('/', auth);
app.use('/mytrips', mytrips);

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
