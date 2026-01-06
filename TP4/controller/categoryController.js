// categoryController.js
const catService = require("../service/categoryService");


const getAllCat = async(req,res)=>{
    try{
    const cats = await catService.getAllCategories();
        res.status(200).json({
          success: true,
          data: cats,
          count: cats.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des categories',
            error: error.message
        });
    }
};
const getCatById = async (req, res) => {
    try {
      const cats = await catService.getCategoriesByID(req.params.id);
      res.status(200).json({
        success: true,
        data: cats,
        count: cats.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erreur lors de la récupération de la categories ID ${req.params.id}`,
        error: error.message,
      });
    }
};
const addCat = async (req,res)=>{
    try {
      const newCat = await catService.createCategorie(req.body);
      res.status(200).json({
        success: true,
        data: newCat,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création d'une categorie",
        error: error.message,
      });
    }
};

module.exports = {getAllCat,getCatById,addCat}