const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use('/',userRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('http://localhost:3000/');
});
