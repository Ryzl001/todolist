const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Load Routes
const todoRoutes = require('./routes/api/todos');


// Use Routes
app.use('/api/todos', todoRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App is Running on port 5000')
});