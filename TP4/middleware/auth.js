const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/jwt");
const User = require("../model/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    // On stocke l'utilisateur dans req pour les routes protégées
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalide" });
  }
};

module.exports = authMiddleware;
