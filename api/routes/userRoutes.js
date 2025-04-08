const express = require("express");
const { createUser, getUser, deleteUser, addRoleToUser, removeRoleFromUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'un utilisateur (protégée par un rôle/admin)
router.post("/", authMiddleware, /*checkPermission("user:create"),*/ createUser);

// Récupération d'un utilisateur
router.get("/:id", authMiddleware, getUser);

// Suppression d'un utilisateur (protégée par un rôle/admin)
router.delete("/:id", authMiddleware, /*checkPermission("user:delete"),*/ deleteUser);

// Ajouter un rôle à un utilisateur
router.post("/addRole", authMiddleware, addRoleToUser);

// Retirer un rôle d'un utilisateur
router.post("/removeRole", authMiddleware, removeRoleFromUser);

module.exports = router;
