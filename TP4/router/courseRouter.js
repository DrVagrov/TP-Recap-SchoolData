const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  getCoursesByLevel,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courseController");

const {createCourseValidator} = require("../validators/courseValidator");
const authMiddleware = require("../middleware/auth");


/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupère tous les cours publiés
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Liste des cours publiés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 */
router.get("/", getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Récupère un cours par son identifiant
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du cours
 *     responses:
 *       200:
 *         description: Détails du cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Cours non trouvé
 */
router.get("/:id", getCourseById);

/**
 * @swagger
 * /courses/level/{level}:
 *   get:
 *     summary: Récupère tous les cours d'un niveau spécifique
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *         description: "Niveau du cours (ex: débutant, intermédiaire, avancé)"
 *     responses:
 *       200:
 *         description: Liste des cours filtrés par niveau
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 */
router.get("/level/:level", getCoursesByLevel);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Crée un nouveau cours
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *           examples:
 *             example:
 *               value:
 *                 title: "Nouveau cours"
 *                 description: "Description détaillée du cours"
 *                 duration: 90
 *                 level: "débutant"
 *                 price: 49.99
 *                 instructor: "John Doe"
 *                 published: true
 *                 categoryId: 2
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 */
router.post("/", authMiddleware, createCourseValidator, createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Met à jour un cours existant
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du cours à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       404:
 *         description: Cours non trouvé
 */
router.put("/:id", authMiddleware, updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Supprime un cours
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du cours à supprimer
 *     responses:
 *       200:
 *         description: Cours supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Cours supprimé avec succès"
 *       404:
 *         description: Cours non trouvé
 */

router.delete("/:id", authMiddleware, deleteCourse);

module.exports = router;
