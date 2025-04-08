const express = require("express");
const { createRole, getRoles, getRoleById, deleteRole, addPermissionToRole, removePermissionFromRole } = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'un rôle (protégée par un rôle/admin)
router.post("/", authMiddleware, /*checkPermission("role:create"),*/ createRole);

// Récupération de tous les rôles
router.get("/", authMiddleware, getRoles);

// Récupération d'un rôle par ID
router.get("/:id", authMiddleware, getRoleById);

// Suppression d'un rôle (protégée par un rôle/admin)
router.delete("/:id", authMiddleware, /*checkPermission("role:delete"),*/ deleteRole);

// Ajouter une permission à un rôle
router.post("/addPermission", authMiddleware, addPermissionToRole);

// Retirer une permission d'un rôle
router.post("/removePermission", authMiddleware, removePermissionFromRole);

module.exports = router;
