const Sequelize = require("sequelize");
const config = require('../config/database');

const UserModel = require('./User');
const RoleModel = require('./Role');
const PermissionModel = require('./Permission');

const sequelize = config;

const User = UserModel(sequelize, Sequelize.DataTypes);
const Role = RoleModel(sequelize, Sequelize.DataTypes);
const Permission = PermissionModel(sequelize, Sequelize.DataTypes);

// Relations User <-> Role
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

// Relations Role <-> Permission
Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
};
