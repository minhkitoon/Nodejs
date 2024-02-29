const sequelize = require('../config/database');
var Sequelize = require('sequelize');
const User = sequelize.define('users', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.INTEGER,
  },
  birthday: {
    type: Sequelize.DATE,
  },
});

module.exports = User
