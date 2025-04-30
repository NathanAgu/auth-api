const { User, Role, Permission } = require("../models");
const bcryptjs = require("bcryptjs");

const initializeDatabase = async () => {
  try {
    const tables = ["users", "roles", "permissions"];
    const actions = ["create", "update", "delete", "read"];

    const permissionsData = tables.flatMap((table) =>
      actions.map((action) => ({
        slug: `${table}:${action}`,
        description: `Permet de ${action} une entrée dans ${table}`
      }))
    );

    const existingPermissions = await Permission.findAll();
    if (existingPermissions.length === 0) {
      await Permission.bulkCreate(permissionsData);
      console.log("✅ Permissions créées");
    }

    let adminRole = await Role.findOne({ where: { name: "admin" } });
    if (!adminRole) {
      adminRole = await Role.create({ name: "admin" });
      console.log("✅ Rôle admin créé");
    }

    const allPermissions = await Permission.findAll();
    await adminRole.setPermissions(allPermissions);
    console.log("🔗 Permissions associées au rôle admin");

    let adminUser = await User.findOne({ where: { username: "admin" } });
    hashedPassword = await bcryptjs.hash("admin", 10);
    if (!adminUser) {
      adminUser = await User.create({
        username: "admin",
        password: hashedPassword,
      });
      console.log("👤 Utilisateur admin créé");
    }

    await adminUser.setRoles([adminRole]);
    console.log("🔗 Rôle admin associé à l'utilisateur admin");

  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de la base de données :", error);
  }
};

module.exports = initializeDatabase;
