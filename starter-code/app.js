const app = require("express")()
require('./config/expresscontroller')()
require('./config/express')(app)

const index = require('./routes/index')
const auth  = require('./routes/auth')

app.use('/', index)
app.use('/',auth)

require('./config/error-handler')(app)

module.exports = app