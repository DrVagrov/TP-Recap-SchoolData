const authService = require("../service/authService");

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
  try {
    const userData = req.body;

    const result = await authService.register(userData);

    res.status(201).json({
      success: true,
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const credentials = req.body;

    const result = await authService.login(credentials);

    res.status(200).json({
      success: true,
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login };
