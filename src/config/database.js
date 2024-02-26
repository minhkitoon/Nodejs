const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
    host: 'localhost',
    dialect: 'mysql',
    // use mysql2 internally
    dialectModule: require('mysql2')
  });

module.exports = sequelize