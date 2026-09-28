const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking_app', 'root', 'Yuvraj@1171', {
  dialect: 'mysql',
  host: 'localhost'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
