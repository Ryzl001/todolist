const mongoose = require('mongoose');
mongoose.set('debug', true);

// Load Keys
const keys = require('../config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


mongoose.Promise = Promise; // pozwala na używanie syntaksu z promise



module.exports.Todo = require('./Todo');
