const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

console.log('example seed file running ... ');
