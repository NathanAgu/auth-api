/**
 * Point d'entrée du serveur
 * @module Server
 */

const app = require("./app");
const database = require('./config/database');
const initializeDatabase = require("./utils/initializeDatabase");
const logger = require("./utils/logger");

// Configuration
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

/**
 * Initialise la base de données
 * @async
 * @returns {Promise<void>}
 */
async function initDatabase() {
    await database.authenticate();
    logger.info("✅ Connexion à la BDD réussie");

    await database.sync({ force: process.env.RESET_DB === 'true' });
    logger.info("📦 Modèles synchronisés");

    await initializeDatabase();
    logger.info("🔧 Données initiales chargées");
}

/**
 * Démarre le serveur
 * @async
 * @returns {Promise<void>}
 */
async function startServer() {
    try {
        await initDatabase();

        app.listen(PORT, () => {
            logger.info(`🚀 Serveur ${ENV} lancé sur http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error("❌ Erreur lors du démarrage :", error);
        process.exit(1);
    }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Promesse non gérée rejetée:', reason);
    // Application des procédures de nettoyage
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error('Exception non capturée:', error);
    // Application des procédures de nettoyage
    process.exit(1);
});

// Démarrage du serveur
startServer();
