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

const createCategoryValidator = [
  // Validation du name
  body("name")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Le nom est obligatoire")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Le nom doit contenir au moins 3 caractères")
    .custom(async (value) => {
      const existing = await Category.findOne({ where: { name: value } });
      if (existing) throw new Error("Le nom de la catégorie doit être unique");
      return true;
    }),

  // Validation de la description
  body("description")
    .optional({ nullable: true, checkFalsy: true }) // Ignore null, undefined, ''
    .trim()
    .isString()
    .withMessage("La description doit être une chaîne"),

  handleValidationErrors,
];

module.exports = { createCategoryValidator };
