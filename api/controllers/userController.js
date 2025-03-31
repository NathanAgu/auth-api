const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Récupère tous les utilisateurs
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};