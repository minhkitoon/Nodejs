const sequelize = require('../config/database');
var Sequelize = require('sequelize');
const Product = require('./product');
const Image = sequelize.define('images', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  table: {
    type: Sequelize.STRING,
    allowNull: false
  },
  table_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

});



module.exports = Image
