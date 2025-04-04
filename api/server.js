const app = require("./app");
const { sequelize } = require("./models");
// const initializeRolesAndPermissions = require("./utils/initRoles");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la BDD réussie");

    await sequelize.sync({ alter: true });
    console.log("📦 Modèles synchronisés");

    // Init données de base (admin, rôles, etc.)
    // await initializeRolesAndPermissions();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage :", error);
    process.exit(1);
  }
})();
