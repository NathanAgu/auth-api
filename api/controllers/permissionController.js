// controllers/permissionController.js
const { Permission } = require("../models");

/**
 * Crée une nouvelle permission
 * @param {Object} req.body - Les données de la permission
 * @param {string} req.body.slug - Identifiant unique de la permission
 * @param {string} req.body.description - Description de la permission
 * @returns {Object} La permission créée
 */
exports.createPermission = async (req, res) => {
    const { slug, description } = req.body;

    try {
        const existingPermission = await Permission.findOne({ where: { slug } });
        if (existingPermission) {
            return res.status(400).json({ message: "La permission existe déjà" });
        }

        const newPermission = await Permission.create({ slug, description });
        res.status(201).json(newPermission);
    } catch (error) {
        console.error("Erreur lors de la création de la permission", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

/**
 * Récupère toutes les permissions
 * @returns {Object[]} Liste de toutes les permissions
 */
exports.getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        console.error("Erreur lors de la récupération des permissions", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

/**
 * Récupère une permission par son ID
 * @param {string} req.params.id - L'ID de la permission
 * @returns {Object} La permission trouvée
 */
exports.getPermissionById = async (req, res) => {
    const { id } = req.params;

    try {
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission non trouvée" });
        }

        res.status(200).json(permission);
    } catch (error) {
        console.error("Erreur lors de la récupération de la permission", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

/**
 * Met à jour une permission
 * @param {string} req.params.id - L'ID de la permission
 * @param {Object} req.body - Les nouvelles données
 * @param {string} [req.body.slug] - Nouveau slug de la permission
 * @param {string} [req.body.description] - Nouvelle description
 * @returns {Object} La permission mise à jour
 */
exports.updatePermission = async (req, res) => {
    const { id } = req.params;
    const { slug, description } = req.body;

    try {
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission non trouvée" });
        }

        if (slug) permission.slug = slug;
        if (description) permission.description = description;

        await permission.save();
        res.status(200).json({ message: "Permission mise à jour", permission });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la permission", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

/**
 * Supprime une permission
 * @param {string} req.params.id - L'ID de la permission
 */
exports.deletePermission = async (req, res) => {
    const { id } = req.params;

    try {
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission non trouvée" });
        }

        await permission.destroy();
        res.status(200).json({ message: "Permission supprimée" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la permission", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
