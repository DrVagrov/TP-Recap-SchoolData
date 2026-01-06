const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Categories & Courses",
      version: "1.0.0",
      description:
        "Documentation minimaliste pour l'API des catégories et des cours",
    },
    servers: [{ url: "http://localhost:3000", description: "Serveur local" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        // =====================
        // Schemas Catégories
        // =====================
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Développement Web" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-01-06T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-01-06T12:00:00Z",
            },
          },
        },
        CategoryInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Nouvelle catégorie" },
          },
        },

        // =====================
        // Schemas Courses
        // =====================
        Course: {
          type: "object",
          description: "Représente un cours dans le système",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Introduction à Node.js" },
            description: {
              type: "string",
              example: "Ce cours couvre les bases de Node.js et Express.",
            },
            level: { type: "string", example: "débutant,intermédiaire,avancé" },
            published: { type: "boolean", example: true },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-01-06T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-01-06T12:30:00Z",
            },
          },
        },
        CourseInput: {
          type: "object",
          description: "Objet pour créer ou mettre à jour un cours",
          required: ["title", "level"],
          properties: {
            title: { type: "string", example: "Nouveau cours" },
            description: {
              type: "string",
              example: "Description détaillée du cours",
            },
            level: { type: "string", example: "débutant,intermédiaire,avancé" },
            published: { type: "boolean", example: true },
          },
        },
      },
    },
  },
  apis: [__dirname + "/../router/*.js"], // chemins vers tes fichiers de routes/controllers avec JSDoc
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      swaggerOptions: {
        operationsSorter: (a, b) => {
          const order = ["get", "post", "put", "patch", "delete"];
          return (
            order.indexOf(a.get("method")) - order.indexOf(b.get("method"))
          );
        },
      },
    })
  );
};

module.exports = setupSwagger;
