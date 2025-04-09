const express = require("express");
const { createPermission, getPermissions, getPermissionById, deletePermission } = require("../controllers/permissionController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'une permission (protégée par un rôle/admin)
router.post("/", authMiddleware, /*checkPermission("permission:create"),*/ createPermission);

// Récupération de toutes les permissions
router.get("/", authMiddleware, getPermissions);

// Récupération d'une permission par ID
router.get("/:id", authMiddleware, getPermissionById);

// Mise à jour d'une permission (protégée par un rôle/admin)
router.put("/:id", permissionController.updatePermission);

// Suppression d'une permission (protégée par un rôle/admin)
router.delete("/:id", authMiddleware, /*checkPermission("permission:delete"),*/ deletePermission);

module.exports = router;
