const express = require("express");
const { createUser, getUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // pour vérifier le token
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'un utilisateur (protégée par un rôle/admin)
router.post("/", authMiddleware, checkPermission("user:create"), createUser);

// Récupération d'un utilisateur
router.get("/:id", authMiddleware, getUser);

// Suppression d'un utilisateur (protégée par un rôle/admin)
router.delete("/:id", authMiddleware, checkPermission("user:delete"), deleteUser);

module.exports = router;
