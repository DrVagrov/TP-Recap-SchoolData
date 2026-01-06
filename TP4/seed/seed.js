const db = require("../config/database");
const { Category, Course} = require("../config/associations");
const User = require("../model/User");
const {
  createCategory,
  createCourse,
  createUser,
} = require("../faker/factory");

async function seedDB() {
  try {
    console.log("Réinitialisation de la base de données...");
    await db.sync({ force: true }); // <-- supprime et recrée toutes les tables
    console.log("Base de données synchronisée ✅");

    // -------------------
    // Seed Categories
    // -------------------
    const NB_CATEGORIES = 5;
    const categoriesData = Array.from({ length: NB_CATEGORIES }, () =>
      createCategory()
    );
    const categories = await Category.bulkCreate(categoriesData, {
      returning: true,
    });
    const categoryIds = categories.map((c) => c.id);
    console.log(`Catégories créées : ${categories.length}`);

    // -------------------
    // Seed Courses
    // -------------------
    const NB_COURSES = 20;
    const coursesData = Array.from({ length: NB_COURSES }, () =>
      createCourse(categoryIds)
    );
    await Course.bulkCreate(coursesData);
    console.log(`Cours créés : ${coursesData.length}`);

    // -------------------
    // Seed Users
    // -------------------
    const NB_USERS = 5;
    const usersData = [];
    for (let i = 0; i < NB_USERS; i++) {
      usersData.push(await createUser());
    }
    await User.bulkCreate(usersData);
    console.log(`Utilisateurs créés : ${usersData.length}`);

    console.log("\n🎉 Seed terminé avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed :", error);
    process.exit(1);
  }
}

seedDB();
