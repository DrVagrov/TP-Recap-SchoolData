const {
  getAllCategories,
  createCategorie,
} = require("../service/categoryService");
const { Category } = require("../config/associations");

// Mock de Sequelize
jest.mock("../config/associations", () => ({
  Category: {
    findAll: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Category Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
  });

  describe("getAllCategories", () => {
    test("devrait retourner toutes les catégories", async () => {
      // Arrange : mock des données renvoyées par findAll
      const mockCategories = [
        { id: 1, name: "Catégorie 1", description: "Desc 1" },
        { id: 2, name: "Catégorie 2", description: "Desc 2" },
      ];
      Category.findAll.mockResolvedValue(mockCategories);

      // Act
      const result = await getAllCategories();

      // Assert
      expect(Category.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCategories);
    });

    test("devrait retourner un tableau vide si aucune catégorie", async () => {
      Category.findAll.mockResolvedValue([]);

      const result = await getAllCategories();

      expect(Category.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe("createCategorie", () => {
    test("devrait créer une nouvelle catégorie avec les champs correctement trimés", async () => {
      const newCatData = {
        name: "  Nouvelle Cat  ",
        description: "  Description  ",
      };
      const createdCategory = {
        id: 1,
        name: "Nouvelle Cat",
        description: "Description",
      };

      Category.create.mockResolvedValue(createdCategory);

      const result = await createCategorie(newCatData);

      expect(Category.create).toHaveBeenCalledWith({
        name: "Nouvelle Cat",
        description: "Description",
      });
      expect(result).toEqual(createdCategory);
    });

    test("devrait créer une catégorie même si la description est manquante", async () => {
      const newCatData = { name: "  Cat Sans Desc  " };
      const createdCategory = { id: 2, name: "Cat Sans Desc", description: "" };

      Category.create.mockResolvedValue(createdCategory);

      const result = await createCategorie(newCatData);

      expect(Category.create).toHaveBeenCalledWith({
        name: "Cat Sans Desc",
        description: "",
      });
      expect(result).toEqual(createdCategory);
    });
  });
});
