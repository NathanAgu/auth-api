const express = require("express");
const { createRole, getRoles } = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'un rôle (protégée par un rôle/admin)
router.post("/", authMiddleware, checkPermission("role:create"), createRole);

// Récupération des rôles
router.get("/", authMiddleware, getRoles);

module.exports = router;
