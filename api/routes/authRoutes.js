const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

/**
 * Routes pour l'authentification
 * @module AuthRoutes
 */

/**
 * POST /api/auth/register
 * Inscrit un nouvel utilisateur
 * @route POST /register
 * @body {string} username - Nom d'utilisateur
 * @body {string} password - Mot de passe
 * @returns {Object} 201 - Utilisateur créé avec succès et token JWT
 * @returns {Object} 400 - Données invalides ou utilisateur déjà existant
 * @returns {Object} 500 - Erreur serveur
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Authentifie un utilisateur
 * @route POST /login
 * @body {string} username - Nom d'utilisateur
 * @body {string} password - Mot de passe
 * @returns {Object} 200 - Authentification réussie et token JWT
 * @returns {Object} 400 - Identifiants invalides
 * @returns {Object} 401 - Authentification échouée
 * @returns {Object} 404 - Utilisateur non trouvé
 * @returns {Object} 500 - Erreur serveur
 */
router.post("/login", login);

module.exports = router;
