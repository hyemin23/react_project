'use strict';
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
