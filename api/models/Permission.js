module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: "RolePermissions",
      foreignKey: "permissionId",
      otherKey: "roleId"
    });
  };

  return Permission;
};
