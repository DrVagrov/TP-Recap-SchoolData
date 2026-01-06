const  {Category,Course}  = require("../config/associations");
const { Op } = require("sequelize");

/**
 * 
 * Récupérer toutes les categories
 */
const getAllCategories = async () => {
  return await Category.findAll();
};
/**
 * Récupérer une categorie par son ID
 */
const getCategoriesByID = async (id) => {
  const category = await Category.findByPk(id, {
    include: [
      {
        model: Course,
        as: "categoryCourses",
      },
    ],
  });
  if (!category) {
    throw new Error(`Aucune catégorie avec l'ID ${id} n'a été trouvé`);
  }
  return category;
};
/**
 * crée une categorie
 */
const createCategorie = async(newCatData)=>
{
   const {name,description} = newCatData;

   const newCat = await Category.create({
     name: name.trim(),
     description: (description || "").trim(),
   });

   return newCat;
};


module.exports = { getAllCategories, getCategoriesByID, createCategorie };
