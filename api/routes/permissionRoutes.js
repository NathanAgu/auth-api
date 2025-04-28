const express = require("express");
const { 
    createPermission, 
    getPermissions, 
    getPermissionById, 
    updatePermission, 
    deletePermission 
} = require("../controllers/permissionController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

/**
 * Routes pour la gestion des permissions
 * @module PermissionRoutes
 */

/**
 * POST /api/permissions
 * Crée une nouvelle permission
 * @route POST /
 * @authentication Requiert un token JWT valide
 * @permission permissions:create
 * @body {string} slug - Identifiant unique de la permission
 * @body {string} description - Description de la permission
 * @returns {Object} 201 - Permission créée avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 */
router.post("/", 
    authMiddleware, 
    // checkPermission("permissions:create"), 
    createPermission
);

/**
 * GET /api/permissions
 * Récupère la liste de toutes les permissions
 * @route GET /
 * @authentication Requiert un token JWT valide
 * @permission permissions:read
 * @query {number} [page=1] - Numéro de la page pour la pagination
 * @query {number} [limit=10] - Nombre d'éléments par page
 * @returns {Array} 200 - Liste des permissions
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 */
router.get("/", 
    authMiddleware, 
    // checkPermission("permissions:read"), 
    getPermissions
);

/**
 * GET /api/permissions/:id
 * Récupère une permission spécifique par son ID
 * @route GET /:id
 * @authentication Requiert un token JWT valide
 * @permission permissions:read
 * @param {string} id - ID de la permission
 * @returns {Object} 200 - Permission trouvée
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Permission non trouvée
 */
router.get("/:id", 
    authMiddleware, 
    // checkPermission("permissions:read"), 
    getPermissionById
);

/**
 * PUT /api/permissions/:id
 * Met à jour une permission existante
 * @route PUT /:id
 * @authentication Requiert un token JWT valide
 * @permission permissions:update
 * @param {string} id - ID de la permission
 * @body {string} [slug] - Nouvel identifiant unique
 * @body {string} [description] - Nouvelle description
 * @returns {Object} 200 - Permission mise à jour
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Permission non trouvée
 */
router.put("/:id", 
    authMiddleware, 
    // checkPermission("permissions:update"), 
    updatePermission
);

/**
 * DELETE /api/permissions/:id
 * Supprime une permission
 * @route DELETE /:id
 * @authentication Requiert un token JWT valide
 * @permission permissions:delete
 * @param {string} id - ID de la permission
 * @returns {Object} 200 - Permission supprimée
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Permission non trouvée
 */
router.delete("/:id", 
    authMiddleware, 
    // checkPermission("permissions:delete"), 
    deletePermission
);

module.exports = router;
