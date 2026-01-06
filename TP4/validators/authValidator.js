const { body, validationResult } = require("express-validator");
const User = require("../model/User");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => e.msg),
    });
  }
  next();
};

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Le nom d'utilisateur est obligatoire")
    .isLength({ min: 3 })
    .withMessage("Le nom d'utilisateur doit contenir au moins 3 caractères")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { username: value } });
      if (existingUser)
        throw new Error("Ce nom d'utilisateur est déjà utilisé");
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Format d'email invalide")
    .custom(async (value) => {
      const existingEmail = await User.findOne({ where: { email: value } });
      if (existingEmail) throw new Error("Cet email est déjà utilisé");
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),

  handleValidationErrors,
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Format d'email invalide"),

  body("password").notEmpty().withMessage("Le mot de passe est obligatoire"),

  handleValidationErrors,
];

module.exports = { registerValidator, loginValidator };
