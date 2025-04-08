const app = require("./app");
const database = require('./config/database');
const initializeDatabase = require("./utils/initializeDatabase");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await database.authenticate();
    console.log("✅ Connexion à la BDD réussie");

    await database.sync({ force: true });
    console.log("📦 Modèles synchronisés");

    // Init données de base (admin, rôles, etc.)
    // await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage :", error);
    process.exit(1);
  }
})();
