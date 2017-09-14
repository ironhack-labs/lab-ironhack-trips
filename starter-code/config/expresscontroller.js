const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('Connected to db!'))
}