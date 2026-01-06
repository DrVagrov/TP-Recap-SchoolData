const courseService = require("../service/courseService");

// Récupère tous les cours publiés
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des cours",
      error: error.message,
    });
  }
};

// Récupère un cours par son identifiant
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Erreur lors de la récupération du cours",
      error: error.message,
    });
  }
};

// Récupère les cours par niveau
const getCoursesByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const courses = await courseService.getCoursesByLevel(level);
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des cours par niveau",
      error: error.message,
    });
  }
};

// Crée un nouveau cours
const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = await courseService.createCourse(courseData);
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du cours",
      error: error.message,
    });
  }
};

// Met à jour un cours existant
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = req.body;
    const updatedCourse = await courseService.updateCourse(id, courseData);
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Erreur lors de la mise à jour du cours",
      error: error.message,
    });
  }
};

// Supprime un cours
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await courseService.deleteCourse(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Erreur lors de la suppression du cours",
      error: error.message,
    });
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
