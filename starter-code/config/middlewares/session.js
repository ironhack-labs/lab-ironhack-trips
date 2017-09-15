const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

module.exports = (mongooseConnection) => (
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection })
  })
)