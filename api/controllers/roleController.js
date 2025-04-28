const { Role, Permission } = require("../models");

/**
 * Crée un nouveau rôle avec des permissions optionnelles
 * @param {Object} req.body - Les données du rôle
 * @param {string} req.body.name - Le nom du rôle
 * @param {string[]} [req.body.permissions] - Liste des slugs des permissions à associer
 * @returns {Object} Le rôle créé
 */
exports.createRole = async (req, res) => {
  const { name, permissions } = req.body;
  
  try {
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "Le rôle existe déjà" });
    }

    const newRole = await Role.create({ name });

    if (permissions && permissions.length > 0) {
      const perms = await Permission.findAll({
        where: {
          slug: permissions,
        },
      });
      await newRole.addPermissions(perms);
    }

    res.status(201).json(newRole);
  } catch (error) {
    console.error("Erreur lors de la création du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Ajoute une permission à un rôle
 * @param {Object} req.body - Les données de l'association
 * @param {string} req.body.roleId - L'ID du rôle
 * @param {string} req.body.permissionSlug - Le slug de la permission à ajouter
 */
exports.addPermissionToRole = async (req, res) => {
  const { roleId, permissionSlug } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    const permission = await Permission.findOne({ where: { slug: permissionSlug } });
    if (!permission) {
      return res.status(404).json({ message: "Permission non trouvée" });
    }

    await role.addPermission(permission);
    res.status(200).json({ message: `Permission ${permissionSlug} ajoutée au rôle` });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la permission au rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Retire une permission d'un rôle
 * @param {Object} req.body - Les données de dissociation
 * @param {string} req.body.roleId - L'ID du rôle
 * @param {string} req.body.permissionSlug - Le slug de la permission à retirer
 */
exports.removePermissionFromRole = async (req, res) => {
  const { roleId, permissionSlug } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    const permission = await Permission.findOne({ where: { slug: permissionSlug } });
    if (!permission) {
      return res.status(404).json({ message: "Permission non trouvée" });
    }

    await role.removePermission(permission);
    res.status(200).json({ message: `Permission ${permissionSlug} retirée du rôle` });
  } catch (error) {
    console.error("Erreur lors du retrait de la permission du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère tous les rôles avec leurs permissions
 * @returns {Object[]} Liste des rôles avec leurs permissions associées
 */
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: {
        model: Permission,
        through: { attributes: [] },
      },
    });

    res.status(200).json(roles);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère un rôle par son ID
 * @param {string} req.params.id - L'ID du rôle
 * @returns {Object} Le rôle avec ses permissions
 */
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        through: { attributes: [] },
      },
    });

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère toutes les permissions d'un rôle
 * @param {string} req.params.id - L'ID du rôle
 * @returns {Object[]} Liste des permissions du rôle
 */
exports.getPermissions = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        through: { attributes: [] }
      }
    });

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    res.status(200).json(role.Permissions);
  } catch (error) {
    console.error("Erreur lors de la récupération des permissions du rôle :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Met à jour les informations d'un rôle
 * @param {string} req.params.id - L'ID du rôle
 * @param {string} req.body.name - Le nouveau nom du rôle
 * @returns {Object} Le rôle mis à jour
 */
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    if (name) {
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole && existingRole.id !== role.id) {
        return res.status(400).json({ message: "Ce nom de rôle est déjà utilisé" });
      }
      role.name = name;
    }

    await role.save();

    res.status(200).json({ message: "Rôle mis à jour", role });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Supprime un rôle
 * @param {string} req.params.id - L'ID du rôle
 */
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    await role.destroy();
    res.status(200).json({ message: "Rôle supprimé" });
  } catch (error) {
    console.error("Erreur lors de la suppression du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};