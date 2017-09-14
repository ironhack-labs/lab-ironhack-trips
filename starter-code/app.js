const express        = require("express")
const session        = require("express-session")
const expressLayouts = require("express-ejs-layouts")
const path           = require("path")
const logger         = require("morgan")
const cookieParser   = require("cookie-parser")
const bodyParser     = require("body-parser")
const mongoose       = require("mongoose")
const app            = express()
const authRoutes     = require('./routes/auth')
const FbStrategy     = require('passport-facebook').Strategy
const MongoStore     = require("connect-mongo")(session)
const passport       = require('passport')

// Controllers
require('dotenv').config()
// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips", {useMongoClient:true})
  .then(()=> debug("connected to db!"))

// Middlewares configuration
app.use(logger("dev"))

// View engine configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/main-layout")
app.use(express.static(path.join(__dirname, "public")))

// Access POST params with body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Authentication
app.use(session({
  secret: "ironhack trips",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}))
app.use(cookieParser())
app.use('/', authRoutes)


require('./passport/serializers');
require('./passport/local');
require('./passport/facebook');

app.use(passport.initialize());
app.use(passport.session());
// Routes
// app.use("/", index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
