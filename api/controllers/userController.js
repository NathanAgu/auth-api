const { User, Role } = require("../models");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const newUser = await User.create({ username, hashedPassword });
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
          through: { attributes: [] }
        },
        attributes: { exclude: ['password'] }
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

exports.updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifie si le nouveau nom d'utilisateur existe déjà
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

exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Mot de passe requis" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe", error);
    res.status(500).json({ message: "Erreur serveur", error });
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


    await user.removeRole(role);
    res.status(200).json({ message: `Rôle ${roleName} retiré de l'utilisateur` });
  } catch (error) {
    console.error("Erreur lors du retrait du rôle de l'utilisateur", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};