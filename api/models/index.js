const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL || "mysql://...");

const User = require("./User")(sequelize);
const Role = require("./Role")(sequelize);
const Permission = require("./Permission")(sequelize);

// Relations User <-> Role
User.belongsToMany(Role, { through: "UserRoles", foreignKey: "user_id" });
Role.belongsToMany(User, { through: "UserRoles", foreignKey: "role_id" });

// Relations Role <-> Permission
Role.belongsToMany(Permission, { through: "RolePermissions", foreignKey: "role_id" });
Permission.belongsToMany(Role, { through: "RolePermissions", foreignKey: "permission_id" });

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
};
