const bcryptjs = require("bcryptjs");
const { User, Role, Permission } = require("../models");

const initializeDatabase = async () => {
  try {
    // Créer les permissions de base
    const permissions = [
      { slug: "user:create", description: "Permet de créer un utilisateur" },
      { slug: "user:delete", description: "Permet de supprimer un utilisateur" },
      { slug: "role:create", description: "Permet de créer un rôle" },
      { slug: "role:delete", description: "Permet de supprimer un rôle" },
      { slug: "permission:create", description: "Permet de créer une permission" },
      { slug: "permission:delete", description: "Permet de supprimer une permission" },
    ];

    // Vérifier si les permissions existent déjà, sinon les créer
    const existingPermissions = await Permission.findAll();
    if (existingPermissions.length === 0) {
      await Permission.bulkCreate(permissions);
      console.log("Permissions de base créées");
    }

    // Créer les rôles de base
    const roles = [
      { name: "admin" },
      { name: "user" },
    ];

    // Vérifier si les rôles existent déjà, sinon les créer
    const existingRoles = await Role.findAll();
    if (existingRoles.length === 0) {
      await Role.bulkCreate(roles);
      console.log("Rôles de base créés");
    }

    // Créer un utilisateur admin
    const adminUser = await User.findOne({ where: { username: "admin" } });
    if (!adminUser) {
      const hashedPassword = await bcryptjs.hash("adminpassword", 10); // hash du mot de passe
      const user = await User.create({
        username: "admin",
        password: hashedPassword,
      });

      // Assigner le rôle "admin" à l'utilisateur admin
      const adminRole = await Role.findOne({ where: { name: "admin" } });
      await user.addRole(adminRole);

      console.log("Utilisateur admin créé avec le rôle 'admin'");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données", error);
  }
};

module.exports = initializeDatabase;
