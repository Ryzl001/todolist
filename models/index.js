const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api')

mongoose.Promise = Promise; // pozwala na używanie syntaksu z promise




module.exports.Todo = require('./Todo');
