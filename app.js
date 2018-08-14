const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load Routes
const todoRoutes = require('./routes/api/todos');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', (req, res) => {
  res.sendfile('index.html')
});

// Use Routes
app.use('/api/todos', todoRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App is Running on port 5000')
});