const Course = require("../model/Course");
const Category = require("../model/Category");

// Une catégorie a plusieurs cours
Category.hasMany(Course, {
  foreignKey: "categoryId",
  as: "categoryCourses", // <- C'EST L'ALIAS ACTUEL
});

// Un cours appartient à une catégorie
Course.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = { Course, Category };
