const express = require("express");
const { 
    createUser, 
    getUser, 
    getRoles, 
    updateUserInfo, 
    updateUserPassword, 
    deleteUser, 
    addRoleToUser, 
    removeRoleFromUser 
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

/**
 * Routes pour la gestion des utilisateurs
 * @module UserRoutes
 */

/**
 * POST /api/users
 * Crée un nouvel utilisateur
 * @route POST /
 * @authentication Requiert un token JWT valide
 * @permission users:create
 * @body {string} username - Nom d'utilisateur
 * @body {string} password - Mot de passe
 * @returns {Object} 201 - Utilisateur créé avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 */
router.post("/", 
    authMiddleware, 
    // checkPermission("users:create"), 
    createUser
);

/**
 * GET /api/users/:id
 * Récupère un utilisateur spécifique
 * @route GET /:id
 * @authentication Requiert un token JWT valide
 * @permission users:read
 * @param {string} id - ID de l'utilisateur
 * @returns {Object} 200 - Utilisateur trouvé
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur non trouvé
 */
router.get("/:id", 
    authMiddleware, 
    // checkPermission("users:read"), 
    getUser
);

/**
 * GET /api/users/:id/roles
 * Récupère les rôles d'un utilisateur
 * @route GET /:id/roles
 * @authentication Requiert un token JWT valide
 * @permission users:read
 * @param {string} id - ID de l'utilisateur
 * @returns {Array} 200 - Liste des rôles de l'utilisateur
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur non trouvé
 */
router.get("/:id/roles", 
    authMiddleware, 
    // checkPermission("users:read"), 
    getRoles
);

/**
 * PUT /api/users/:id
 * Met à jour les informations d'un utilisateur
 * @route PUT /:id
 * @authentication Requiert un token JWT valide
 * @permission users:update
 * @param {string} id - ID de l'utilisateur
 * @body {string} [username] - Nouveau nom d'utilisateur
 * @returns {Object} 200 - Utilisateur mis à jour
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur non trouvé
 */
router.put("/:id", 
    authMiddleware,
    // checkPermission("users:update"), 
    updateUserInfo
);

/**
 * PUT /api/users/:id/password
 * Met à jour le mot de passe d'un utilisateur
 * @route PUT /:id/password
 * @authentication Requiert un token JWT valide
 * @permission users:update
 * @param {string} id - ID de l'utilisateur
 * @body {string} password - Nouveau mot de passe
 * @returns {Object} 200 - Mot de passe mis à jour
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur non trouvé
 */
router.put("/:id/password", 
    authMiddleware,
    // checkPermission("users:update"), 
    updateUserPassword
);

/**
 * DELETE /api/users/:id
 * Supprime un utilisateur
 * @route DELETE /:id
 * @authentication Requiert un token JWT valide
 * @permission users:delete
 * @param {string} id - ID de l'utilisateur
 * @returns {Object} 200 - Utilisateur supprimé
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur non trouvé
 */
router.delete("/:id", 
    authMiddleware, 
    // checkPermission("users:delete"), 
    deleteUser
);

/**
 * POST /api/users/addRole
 * Ajoute un rôle à un utilisateur
 * @route POST /addRole
 * @authentication Requiert un token JWT valide
 * @permission users:update
 * @body {string} userId - ID de l'utilisateur
 * @body {string} roleName - Nom du rôle à ajouter
 * @returns {Object} 200 - Rôle ajouté avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur ou rôle non trouvé
 */
router.post("/addRole", 
    authMiddleware, 
    // checkPermission("users:update"), 
    addRoleToUser
);

/**
 * POST /api/users/removeRole
 * Retire un rôle d'un utilisateur
 * @route POST /removeRole
 * @authentication Requiert un token JWT valide
 * @permission users:update
 * @body {string} userId - ID de l'utilisateur
 * @body {string} roleName - Nom du rôle à retirer
 * @returns {Object} 200 - Rôle retiré avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Utilisateur ou rôle non trouvé
 */
router.post("/removeRole", 
    authMiddleware, 
    // checkPermission("users:update"), 
    removeRoleFromUser
);

module.exports = router;
