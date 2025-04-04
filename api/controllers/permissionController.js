// controllers/permissionController.js
const { Permission } = require("../models");

exports.createPermission = async (req, res) => {
  const { slug, description } = req.body;

  try {
    // Vérifie si la permission existe déjà
    const existingPermission = await Permission.findOne({ where: { slug } });
    if (existingPermission) {
      return res.status(400).json({ message: "La permission existe déjà" });
    }

    // Crée la nouvelle permission
    const newPermission = await Permission.create({ slug, description });
    res.status(201).json(newPermission);
  } catch (error) {
    console.error("Erreur lors de la création de la permission", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    console.error("Erreur lors de la récupération des permissions", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

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
