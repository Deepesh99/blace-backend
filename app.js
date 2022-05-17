const express = require('express');

const app = express();

app.use((req, res) => {
  res.send('Hello world');
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('http://localhost:3000/');
});
