const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Setup connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

// Load models
const User = require('./user')(sequelize, DataTypes);
const Post = require('./post')(sequelize, DataTypes);
const Newsletters = require('./newsletters')(sequelize, DataTypes);
const ErrorLog = require('./ErrorLog')(sequelize, DataTypes);

// Associations
User.hasMany(Post);
Post.belongsTo(User);

// Export
module.exports = {
  sequelize,
  Sequelize,
  User,
  Post,
  Newsletters,
  ErrorLog
};
