const express = require("express");
const { 
    createRole, 
    getRoles, 
    getRoleById, 
    getPermissions, 
    updateRole, 
    deleteRole, 
    addPermissionToRole, 
    removePermissionFromRole 
} = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

/**
 * Routes pour la gestion des rôles
 * @module RoleRoutes
 */

/**
 * POST /api/roles
 * Crée un nouveau rôle
 * @route POST /
 * @authentication Requiert un token JWT valide
 * @permission roles:create
 * @body {string} name - Nom du rôle
 * @body {string[]} [permissions] - Liste des slugs des permissions à associer
 * @returns {Object} 201 - Rôle créé avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 */
router.post("/", 
    authMiddleware, 
    checkPermission("roles:create"), 
    createRole
);

/**
 * GET /api/roles
 * Récupère la liste de tous les rôles
 * @route GET /
 * @authentication Requiert un token JWT valide
 * @permission roles:read
 * @query {number} [page=1] - Numéro de la page
 * @query {number} [limit=10] - Nombre d'éléments par page
 * @returns {Array} 200 - Liste des rôles
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 */
router.get("/", 
    authMiddleware, 
    checkPermission("roles:read"), 
    getRoles
);

/**
 * GET /api/roles/:id
 * Récupère un rôle spécifique
 * @route GET /:id
 * @authentication Requiert un token JWT valide
 * @permission roles:read
 * @param {string} id - ID du rôle
 * @returns {Object} 200 - Rôle trouvé
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Rôle non trouvé
 */
router.get("/:id", 
    authMiddleware, 
    checkPermission("roles:read"), 
    getRoleById
);

/**
 * GET /api/roles/:id/permissions
 * Récupère les permissions d'un rôle
 * @route GET /:id/permissions
 * @authentication Requiert un token JWT valide
 * @permission roles:read
 * @param {string} id - ID du rôle
 * @returns {Array} 200 - Liste des permissions du rôle
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Rôle non trouvé
 */
router.get("/:id/permissions", 
    authMiddleware, 
    checkPermission("roles:read"), 
    getPermissions
);

/**
 * PUT /api/roles/:id
 * Met à jour un rôle
 * @route PUT /:id
 * @authentication Requiert un token JWT valide
 * @permission roles:update
 * @param {string} id - ID du rôle
 * @body {string} [name] - Nouveau nom du rôle
 * @returns {Object} 200 - Rôle mis à jour
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Rôle non trouvé
 */
router.put("/:id", 
    authMiddleware,
    checkPermission("roles:update"), 
    updateRole
);

/**
 * DELETE /api/roles/:id
 * Supprime un rôle
 * @route DELETE /:id
 * @authentication Requiert un token JWT valide
 * @permission roles:delete
 * @param {string} id - ID du rôle
 * @returns {Object} 200 - Rôle supprimé
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Rôle non trouvé
 */
router.delete("/:id", 
    authMiddleware, 
    checkPermission("roles:delete"), 
    deleteRole
);

/**
 * POST /api/roles/addPermission
 * Ajoute une permission à un rôle
 * @route POST /addPermission
 * @authentication Requiert un token JWT valide
 * @permission roles:update
 * @body {string} roleId - ID du rôle
 * @body {string} permissionSlug - Slug de la permission à ajouter
 * @returns {Object} 200 - Permission ajoutée avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Rôle ou permission non trouvé
 */
router.post("/addPermission", 
    authMiddleware, 
    checkPermission("roles:update"), 
    addPermissionToRole
);

/**
 * POST /api/roles/removePermission
 * Retire une permission d'un rôle
 * @route POST /removePermission
 * @authentication Requiert un token JWT valide
 * @permission roles:update
 * @body {string} roleId - ID du rôle
 * @body {string} permissionSlug - Slug de la permission à retirer
 * @returns {Object} 200 - Permission retirée avec succès
 * @returns {Object} 400 - Données invalides
 * @returns {Object} 401 - Non authentifié
 * @returns {Object} 403 - Permission refusée
 * @returns {Object} 404 - Rôle ou permission non trouvé
 */
router.post("/removePermission", 
    authMiddleware, 
    checkPermission("roles:update"), 
    removePermissionFromRole
);

module.exports = router;
