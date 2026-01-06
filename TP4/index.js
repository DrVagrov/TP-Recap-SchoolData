require("dotenv").config();
const express = require("express");

const db = require("./config/database");

const authRouter = require("./router/authRouter");
const categoryRouter = require("./router/categoryRouter");
const courseRouter = require("./router/courseRouter");
const setupSwagger = require("./config/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/auth", authRouter); 
app.use("/categories", categoryRouter); 
app.use("/courses", courseRouter); 
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de cours !");
});

const initDatabase = async () => {
  try {
    await db.sync(); // permet de se connecter et de creer la base de donnees
    app.listen(PORT, () => {
      console.log(`Serveur demarre sur http://localhost:${PORT}`);
      console.log(
        `Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("Erreur initialisation:", error);
  }
};

initDatabase();
