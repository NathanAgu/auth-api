const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const roleRoutes = require("./roleRoutes");

const router = express.Router();

// Utilisation des routes spécifiques
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);

module.exports = router;
