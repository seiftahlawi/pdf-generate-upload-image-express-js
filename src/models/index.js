// models/index.js
const Sequelize = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname, '../../', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Image = require('./Image')(sequelize, Sequelize);
const PDF = require('./Pdf')(sequelize, Sequelize);

module.exports = { sequelize, Image, PDF };
