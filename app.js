const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page')
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App is Running on port 5000')
});