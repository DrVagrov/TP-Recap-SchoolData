const {
  getAllCourses,
  getCourseById,
  createCourse,
} = require("../service/courseService");
const { Course } = require("../config/associations");

// Mock de Sequelize
jest.mock("../config/associations", () => ({
  Course: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Course Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------
  // Tests pour getAllCourses
  // -----------------------------
  describe("getAllCourses", () => {
    test("devrait retourner tous les cours publiés", async () => {
      const mockCourses = [
        { id: 1, title: "Cours 1", published: true },
        { id: 2, title: "Cours 2", published: true },
      ];
      Course.findAll.mockResolvedValue(mockCourses);

      const result = await getAllCourses();

      expect(Course.findAll).toHaveBeenCalledWith({
        where: { published: true },
      });
      expect(result).toEqual(mockCourses);
    });

    test("devrait lancer une erreur si findAll échoue", async () => {
      Course.findAll.mockRejectedValue(new Error("DB error"));

      await expect(getAllCourses()).rejects.toThrow(
        "Erreur lors de la récupération des cours : DB error"
      );
    });
  });

  // -----------------------------
  // Tests pour getCourseById
  // -----------------------------
  describe("getCourseById", () => {
    test("devrait retourner le cours correspondant à l'ID", async () => {
      const mockCourse = { id: 1, title: "Cours 1" };
      Course.findByPk.mockResolvedValue(mockCourse);

      const result = await getCourseById(1);

      expect(Course.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCourse);
    });

    test("devrait lancer une erreur si le cours n'existe pas", async () => {
      Course.findByPk.mockResolvedValue(null);

      await expect(getCourseById(999)).rejects.toThrow(
        "Erreur lors de la récupération du cours : Cours non trouvé"
      );
    });

    test("devrait lancer une erreur si findByPk échoue", async () => {
      Course.findByPk.mockRejectedValue(new Error("DB error"));

      await expect(getCourseById(1)).rejects.toThrow(
        "Erreur lors de la récupération du cours : DB error"
      );
    });
  });

  // -----------------------------
  // Tests pour createCourse
  // -----------------------------
  describe("createCourse", () => {
    test("devrait créer un nouveau cours avec les champs trimés et valeurs par défaut", async () => {
      const newCourseData = {
        title: "  Nouveau Cours  ",
        description: "  Description du cours  ",
        duration: 120,
        level: "intermédiaire",
        price: 50,
        published: true,
        instructor: "  Professeur X  ",
        categoryId: 1,
      };

      const createdCourse = {
        id: 1,
        title: "Nouveau Cours",
        description: "Description du cours",
        duration: 120,
        level: "intermédiaire",
        price: 50,
        published: true,
        instructor: "Professeur X",
        categoryId: 1,
      };

      Course.create.mockResolvedValue(createdCourse);

      const result = await createCourse(newCourseData);

      expect(Course.create).toHaveBeenCalledWith({
        title: "Nouveau Cours",
        description: "Description du cours",
        duration: 120,
        level: "intermédiaire",
        price: 50,
        published: true,
        instructor: "Professeur X",
        categoryId: 1,
      });
      expect(result).toEqual(createdCourse);
    });

    test("devrait utiliser des valeurs par défaut si certains champs manquent", async () => {
      const newCourseData = {
        title: "Cours par défaut",
        description: "Description",
        duration: 60,
        instructor: "Professeur Y",
      };

      const createdCourse = {
        id: 2,
        title: "Cours par défaut",
        description: "Description",
        duration: 60,
        level: "débutant",
        price: undefined,
        published: false,
        instructor: "Professeur Y",
        categoryId: null,
      };

      Course.create.mockResolvedValue(createdCourse);

      const result = await createCourse(newCourseData);

      expect(Course.create).toHaveBeenCalledWith({
        title: "Cours par défaut",
        description: "Description",
        duration: 60,
        level: "débutant",
        price: undefined,
        published: false,
        instructor: "Professeur Y",
        categoryId: null,
      });
      expect(result).toEqual(createdCourse);
    });
  });
});
