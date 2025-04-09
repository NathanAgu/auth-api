const { User, Role } = require("../models");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findByPk(id,
      {
        include: {
          model: Role,
          through: { attributes: [] },
          include: [
            {
              model: Permission,
              through: { attributes: [] },
            },
          ]
        }
      }
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
  }
};

exports.addRoleToUser = async (req, res) => {
  const { userId, roleName } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    // Ajouter le rôle à l'utilisateur
    await user.addRole(role);
    res.status(200).json({ message: `Rôle ${roleName} ajouté à l'utilisateur` });
  } catch (error) {
    console.error("Erreur lors de l'ajout du rôle à l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.removeRoleFromUser = async (req, res) => {
  const { userId, roleName } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé" });
    }

    // Retirer le rôle de l'utilisateur
    await user.removeRole(role);
    res.status(200).json({ message: `Rôle ${roleName} retiré de l'utilisateur` });
  } catch (error) {
    console.error("Erreur lors du retrait du rôle de l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};