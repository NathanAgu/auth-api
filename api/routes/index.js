/**
 * Router principal de l'API
 * @module Routes
 */

const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const roleRoutes = require("./roleRoutes");
const permissionRoutes = require("./permissionRoutes");

const router = express.Router();

/**
 * Routes d'authentification
 * @name AuthRoutes
 * @route /api/auth
 * @see module:AuthRoutes
 */
router.use("/auth", authRoutes);

/**
 * Routes de gestion des utilisateurs
 * @name UserRoutes
 * @route /api/users
 * @see module:UserRoutes
 */
router.use("/users", userRoutes);

/**
 * Routes de gestion des rôles
 * @name RoleRoutes
 * @route /api/roles
 * @see module:RoleRoutes
 */
router.use("/roles", roleRoutes);

/**
 * Routes de gestion des permissions
 * @name PermissionRoutes
 * @route /api/permissions
 * @see module:PermissionRoutes
 */
router.use("/permissions", permissionRoutes);

module.exports = router;
