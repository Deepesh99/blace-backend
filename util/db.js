const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog-db', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize;
