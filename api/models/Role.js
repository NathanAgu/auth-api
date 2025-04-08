const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
    });
    Role.belongsToMany(models.Permission, {
      through: "RolePermissions",
      foreignKey: "roleId",
      otherKey: "permissionId",
    });
  };

  return Role;
};
