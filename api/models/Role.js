module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: "UserRoles",
      foreignKey: "roleId",
      otherKey: "userId"
    });

    Role.belongsToMany(models.Permission, {
      through: "RolePermissions",
      foreignKey: "roleId",
      otherKey: "permissionId"
    });
  };

  return Role;
};
