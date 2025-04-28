const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Middleware d'authentification
 * Vérifie la présence et la validité du token JWT dans les headers
 * Ajoute l'utilisateur décodé à l'objet request
 * 
 * @param {Object} req - L'objet request Express
 * @param {Object} res - L'objet response Express
 * @param {Function} next - Fonction Express suivante
 * @returns {void}
 * @throws {401} - Si le token est invalide
 * @throws {403} - Si le token est manquant
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(403).json({ 
                success: false,
                message: "Token manquant" 
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(403).json({ 
                success: false,
                message: "Format de token invalide" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "Utilisateur non trouvé" 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ 
                success: false,
                message: "Token invalide" 
            });
        }
        
        console.error("Erreur d'authentification:", error);
        res.status(500).json({ 
            success: false,
            message: "Erreur serveur" 
        });
    }
};

module.exports = authMiddleware;
