const { body, validationResult } = require("express-validator");
const Category = require("../model/Category");

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

const createCourseValidator = [
  // title : non vide, min 3 caractères
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ min: 3 })
    .withMessage("Le titre doit contenir au moins 3 caractères"),

  // description : non vide, min 10 caractères
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La description est obligatoire")
    .isLength({ min: 10 })
    .withMessage("La description doit contenir au moins 10 caractères"),

  // duration : nombre positif
  body("duration")
    .notEmpty()
    .withMessage("La durée est obligatoire")
    .isInt({ gt: 0 })
    .withMessage("La durée doit être un nombre positif"),

  // level : débutant, intermédiaire ou avancé
  body("level")
    .notEmpty()
    .withMessage("Le niveau est obligatoire")
    .isIn(["débutant", "intermédiaire", "avancé"])
    .withMessage("Le niveau doit être 'débutant', 'intermédiaire' ou 'avancé'"),

  // price : nombre positif ou 0
  body("price")
    .notEmpty()
    .withMessage("Le prix est obligatoire")
    .isFloat({ min: 0 })
    .withMessage("Le prix doit être un nombre positif ou égal à 0"),

  // instructor : non vide
  body("instructor")
    .trim()
    .notEmpty()
    .withMessage("Le nom de l'instructeur est obligatoire"),

  // categoryId : doit exister dans la base
  body("categoryId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("categoryId doit être un entier positif")
    .bail()
    .custom(async (value) => {
      if (value) {
        const category = await Category.findByPk(value);
        if (!category) throw new Error("La catégorie spécifiée n'existe pas");
      }
      return true;
    }),

  handleValidationErrors,
];

module.exports = { createCourseValidator };
