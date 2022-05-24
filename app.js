// npm packages
const express = require('express');
const bodyParser = require('body-parser');

// db config
const db = require('./util/db');

// models
const user = require('./model/user');
const userAuth = require('./model/userAuth');
const userPost = require('./model/userPost');

// associations
userAuth.hasOne(user, {
  onDelete: 'CASCADE',
  foreignKey: 'userId',
});

userAuth.hasMany(userPost, {
  onDelete: 'CASCADE',
  foreignKey: 'userId',
});

// routes
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

// routing
app.use('/', userRoutes);

/**
 * connect with databse and if connection is success only then will listen on port 3000.
 * 'force' can use value true and false. true if we need to override existing
 *    database a created new empty tables.
 */
db
  //  .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
