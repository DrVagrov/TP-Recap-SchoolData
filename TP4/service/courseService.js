const {Course} = require("../config/associations");
const { Op } = require("sequelize");

// Récupère tous les cours publiés
const getAllCourses = async () => {
  try {
    const courses = await Course.findAll({
      where: { published: true },
    });
    return courses;
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération des cours : " + error.message
    );
  }
};

// Récupère un cours par son identifiant
const getCourseById = async (id) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) throw new Error("Cours non trouvé");
    return course;
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération du cours : " + error.message
    );
  }
};

// Récupère tous les cours correspondant à un niveau spécifique
const getCoursesByLevel = async (level) => {
  try {
    const courses = await Course.findAll({
      where: { level },
    });
    return courses;
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération des cours par niveau : " + error.message
    );
  }
};

// Crée un nouveau cours avec les données fournies
const createCourse = async (newCourseData) => {
  const {
    title,
    description,
    duration,
    level,
    price,
    published,
    instructor,
    categoryId,
  } = newCourseData;

  // Création du cours avec protection des champs optionnels
  const newCourse = await Course.create({
    title: title.trim(),
    description: description.trim(),
    duration,
    level: level ? level.trim() : "débutant",
    price,
    published: published !== undefined ? published : false,
    instructor: instructor.trim(),
    categoryId: categoryId || null,
  });

  return newCourse;
};

// Met à jour un cours existant avec les nouvelles données
const updateCourse = async (id, courseData) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) throw new Error("Cours non trouvé");

    await course.update(courseData);
    return course;
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour du cours : " + error.message
    );
  }
};

// Supprime un cours par son identifiant
const deleteCourse = async (id) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) throw new Error("Cours non trouvé");

    await course.destroy();
    return { message: "Cours supprimé avec succès" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la suppression du cours : " + error.message
    );
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getCoursesByLevel,
  createCourse,
  updateCourse,
  deleteCourse,
};
