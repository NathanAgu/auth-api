const { User, Role, Permission } = require("../models");

const initializeDatabase = async () => {
  try {
    // === 1. Créer toutes les permissions ===
    const tables = ["users", "roles", "permissions"];
    const actions = ["create", "update", "delete"];

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

    // === 2. Créer le rôle admin ===
    let adminRole = await Role.findOne({ where: { name: "admin" } });
    if (!adminRole) {
      adminRole = await Role.create({ name: "admin" });
      console.log("✅ Rôle admin créé");
    }

    // Associer toutes les permissions au rôle admin
    const allPermissions = await Permission.findAll();
    await adminRole.setPermissions(allPermissions); // Remplace les permissions existantes
    console.log("🔗 Permissions associées au rôle admin");

    // === 3. Créer l'utilisateur admin ===
    let adminUser = await User.findOne({ where: { username: "admin" } });
    if (!adminUser) {
      adminUser = await User.create({
        username: "admin",
        password: "adminPassword",
      });
      console.log("👤 Utilisateur admin créé");
    }

    // Associer le rôle admin à l'utilisateur
    await adminUser.setRoles([adminRole]);
    console.log("🔗 Rôle admin associé à l'utilisateur admin");

  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de la base de données :", error);
  }
};

module.exports = initializeDatabase;
