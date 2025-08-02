const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Movie = require('./movie')(sequelize, DataTypes);
const Genre = require('./genre')(sequelize, DataTypes);
const Cast = require('./cast')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Movie,
  Genre,
  Cast
};
