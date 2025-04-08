const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Permission = sequelize.define("Permission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: "RolePermissions",
    });
  };

  return Permission;
};
