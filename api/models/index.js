const Sequelize = require("sequelize");
const config = require('../config/database');

const sequelize = config;

const db = {
  User: require("./User")(sequelize, Sequelize.DataTypes),
  Role: require("./Role")(sequelize, Sequelize.DataTypes),
  Permission: require("./Permission")(sequelize, Sequelize.DataTypes)
};

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;