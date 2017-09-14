const express        = require("express")
const session        = require("express-session")
const expressLayouts = require("express-ejs-layouts")
const path           = require("path")
const logger         = require("morgan")
const cookieParser   = require("cookie-parser")
const bodyParser     = require("body-parser")
const mongoose       = require("mongoose")
const app            = express()
const passport       = require("passport")
require('dotenv').config()

// Controllers

// Mongoose configuration
mongoose.connect("mongodb://localhost/ironhack-trips")

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
  secret: "ironhack trips"
}))
app.use(cookieParser())

require('./passport/facebook')
require('./passport/serializers')

app.use(passport.initialize())
app.use(passport.session())

// Routes
const index = require('./routes/index')
const auth = require('./routes/auth')
const trips = require('./routes/trips')
app.use("/", index)
app.use("/", auth)
app.use("/trips", trips)

require('./config/error-handler')(app)

module.exports = app
