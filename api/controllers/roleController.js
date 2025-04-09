const { Role, Permission } = require("../models");

exports.createRole = async (req, res) => {
  const { name, permissions } = req.body; // 'permissions' serait un tableau des slugs des permissions
  
  try {
    // Vérifie si le rôle existe déjà
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "Le rôle existe déjà" });
    }

    // Crée le rôle
    const newRole = await Role.create({ name });

    // Si des permissions sont envoyées, associe-les au rôle
    if (permissions && permissions.length > 0) {
      const perms = await Permission.findAll({
        where: {
          slug: permissions,
        },
      });
      await newRole.addPermissions(perms); // Ajoute les permissions au rôle
    }

    res.status(201).json(newRole);
  } catch (error) {
    console.error("Erreur lors de la création du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getRoles = async (req, res) => {
  try {
    // Récupère tous les rôles, y compris leurs permissions associées
    const roles = await Role.findAll({
      include: {
        model: Permission,
        through: { attributes: [] }, // Exclut les attributs de la table de jointure
      },
    });

    res.status(200).json(roles);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        through: { attributes: [] }, // Exclut les attributs de la table de jointure
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

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    // Vérifie si un autre rôle avec le même nom existe déjà
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

    // Ajouter la permission au rôle
    await role.addPermission(permission);
    res.status(200).json({ message: `Permission ${permissionSlug} ajoutée au rôle` });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la permission au rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

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

    // Retirer la permission du rôle
    await role.removePermission(permission);
    res.status(200).json({ message: `Permission ${permissionSlug} retirée du rôle` });
  } catch (error) {
    console.error("Erreur lors du retrait de la permission du rôle", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};