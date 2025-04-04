const express = require("express");
const { createRole, getRoles, getRoleById, deleteRole } = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'un rôle (protégée par un rôle/admin)
router.post("/", authMiddleware, checkPermission("role:create"), createRole);

// Récupération de tous les rôles
router.get("/", authMiddleware, getRoles);

// Récupération d'un rôle par ID
router.get("/:id", authMiddleware, getRoleById);

// Suppression d'un rôle (protégée par un rôle/admin)
router.delete("/:id", authMiddleware, checkPermission("role:delete"), deleteRole);

module.exports = router;
