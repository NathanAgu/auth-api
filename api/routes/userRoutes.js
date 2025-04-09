const express = require("express");
const { createUser, getUser, updateUserInfo, updateUserPassword, deleteUser, addRoleToUser, removeRoleFromUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");

const router = express.Router();

// Création d'un utilisateur (protégée par un rôle/admin)
router.post("/", authMiddleware, /*checkPermission("user:create"),*/ createUser);

// Récupération d'un utilisateur
router.get("/:id", authMiddleware, getUser);

// Mise à jour des informations d'un utilisateur (protégée par un rôle/admin)
router.put("/:id", updateUserInfo);

// Mise à jour du mot de passe d'un utilisateur (protégée par un rôle/admin)
router.put("/:id/password", updateUserPassword);

// Suppression d'un utilisateur (protégée par un rôle/admin)
router.delete("/:id", authMiddleware, /*checkPermission("user:delete"),*/ deleteUser);

// Ajouter un rôle à un utilisateur
router.post("/addRole", authMiddleware, addRoleToUser);

// Retirer un rôle d'un utilisateur
router.post("/removeRole", authMiddleware, removeRoleFromUser);

module.exports = router;
