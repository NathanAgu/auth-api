const { User, Role } = require("../models");
const bcryptjs = require("bcryptjs");

/**
 * Crée un nouvel utilisateur
 * @param {Object} req.body.username - Nom d'utilisateur
 * @param {Object} req.body.password - Mot de passe
 * @returns {Object} Utilisateur créé (sans le mot de passe)
 */
exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    
    const userWithoutPassword = newUser.toJSON();
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
  }
};

/**
 * Ajoute un rôle à un utilisateur
 * @param {Object} req.body.userId - ID de l'utilisateur
 * @param {Object} req.body.roleName - Nom du rôle à ajouter
 */
exports.addRoleToUser = async (req, res) => {
  const { userId, roleName } = req.body;

  try {
    const [user, role] = await Promise.all([
      User.findByPk(userId),
      Role.findOne({ where: { name: roleName } })
    ]);

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    if (!role) return res.status(404).json({ message: "Rôle non trouvé" });

    await user.addRole(role);
    res.status(200).json({ message: `Rôle ${roleName} ajouté à l'utilisateur` });
  } catch (error) {
    console.error("Erreur lors de l'ajout du rôle à l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Retire un rôle d'un utilisateur
 * @param {string} req.body.userId - ID de l'utilisateur
 * @param {string} req.body.roleName - Nom du rôle à retirer
 */
exports.removeRoleFromUser = async (req, res) => {
  const { userId, roleName } = req.body;

  try {
    const [user, role] = await Promise.all([
      User.findByPk(userId),
      Role.findOne({ where: { name: roleName } })
    ]);

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    if (!role) return res.status(404).json({ message: "Rôle non trouvé" });

    await user.removeRole(role);
    res.status(200).json({ message: `Rôle ${roleName} retiré de l'utilisateur` });
  } catch (error) {
    console.error("Erreur lors du retrait du rôle de l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère les informations d'un utilisateur
 * @param {string} req.params.id - ID de l'utilisateur
 * @returns {Object} Informations de l'utilisateur avec ses rôles
 */
exports.getUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      },
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
  }
};

/**
 * Récupère les rôles d'un utilisateur
 * @param {string} req.params.id - ID de l'utilisateur
 * @returns {Array} Liste des rôles de l'utilisateur
 */
exports.getRoles = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user.Roles);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles de l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Met à jour les informations d'un utilisateur
 * @param {string} req.params.id - ID de l'utilisateur
 * @param {string} req.body.username - Nouveau nom d'utilisateur
 */
exports.updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (username) {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé" });
      }
      user.username = username;
    }

    await user.save();
    res.status(200).json({ message: "Utilisateur mis à jour", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Met à jour le mot de passe d'un utilisateur
 * @param {string} req.params.id - ID de l'utilisateur
 * @param {string} req.body.password - Nouveau mot de passe
 */
exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: "Mot de passe requis" });

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Supprime un utilisateur
 * @param {string} req.params.id - ID de l'utilisateur
 */
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
  }
};