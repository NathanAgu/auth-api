const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Enregistre un nouvel utilisateur
 * @param {Object} req.body - Les données d'inscription
 * @param {string} req.body.username - Nom d'utilisateur
 * @param {string} req.body.password - Mot de passe
 * @returns {Object} Message de confirmation et token JWT

 */
exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "Ce nom d'utilisateur est déjà utilisé" 
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        const token = jwt.sign(
            { id: newUser.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            success: true,
            message: "Utilisateur créé", 
            token 
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ 
            success: false,
            message: "Erreur serveur", 
            error: error.message 
        });
    }
};

/**
 * Authentifie un utilisateur
 * @param {Object} req.body - Les identifiants de connexion
 * @param {string} req.body.username - Nom d'utilisateur
 * @param {string} req.body.password - Mot de passe
 * @returns {Object} Message de confirmation et token JWT
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "Utilisateur non trouvé" 
            });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ 
                success: false,
                message: "Mot de passe incorrect" 
            });
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            success: true,
            message: "Connexion réussie", 
            token 
        });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ 
            success: false,
            message: "Erreur serveur", 
            error: error.message 
        });
    }
};
