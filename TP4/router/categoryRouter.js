const express = require("express");
const router = express.Router();

const {getAllCat,getCatById,addCat,} = require("../controller/categoryController");
const {createCategoryValidator} = require("../validators/categoryValidator");
const authMiddleware = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags: [Categories]
 *     x-order: 1
 *     responses:
 *       200:
 *         description: Liste des catégories récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 count:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getAllCat);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par ID
 *     tags: [Categories]
 *     x-order: 2
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *                 count:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", getCatById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Ajouter une nouvelle catégorie (protégé)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouvelle catégorie"
 *               description:
 *                 type: string
 *                 example: "Une description optionnelle"
 *           examples:
 *             withDescription:
 *               summary: Exemple avec description
 *               value:
 *                 name: "Catégorie A"
 *                 description: "Une description optionnelle"
 *             withoutDescription:
 *               summary: Exemple sans description
 *               value:
 *                 name: "Catégorie B"
 *             tooShort:
 *               summary: Exemple titre trop court
 *               value:
 *                 name: "Ca"
 *             empty:
 *               summary: Exemple titre vide
 *               value:
 *                 name: ""
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */
router.post("/", authMiddleware, createCategoryValidator, addCat);

module.exports = router;
