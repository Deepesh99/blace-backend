// npm packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
const generalRoutes = require('./routes/general');

const app = express();

// CORS - now allows all cors
// TODO: configure cors
app.use(cors());

// used to parse json data that comes in body of any request
app.use(bodyParser.json());

// routing
app.use('/user', userRoutes);
app.use('/', generalRoutes);

/**
 * connect with databse and if connection is success only then will listen on port 3000.
 * 'force' can use value true and false. true if we need to override existing
 *    database a created new empty tables.
 */
db
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
