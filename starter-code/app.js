const app = require("express")()
require('./config/expresscontroller')()
require('./config/express')(app)

const index = require('./routes/index')
const auth  = require('./routes/auth')
const users = require('./routes/users')

app.use('/', index)
app.use('/', auth)
app.use('/', users)

require('./config/error-handler')(app)

module.exports = app