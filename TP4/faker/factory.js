const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const levels = ["débutant", "intermédiaire", "avancé"];
const roles = ["instructor", "admin"];

// Category Factory
const usedCategoryNames = new Set();
const createCategory = (overrides = {}) => {
  let name;
  do {
    name = overrides.name || faker.commerce.department();
  } while (usedCategoryNames.has(name));
  usedCategoryNames.add(name);

  return {
    name,
    description: overrides.description || faker.lorem.sentence(),
    ...overrides,
  };
};

// Course Factory
const createCourse = (categoryIds = [], overrides = {}) => {
  const categoryId =
    overrides.categoryId !== undefined
      ? overrides.categoryId
      : categoryIds.length
      ? faker.helpers.arrayElement(categoryIds)
      : null;

  return {
    title: overrides.title || faker.lorem.words(3),
    description: overrides.description || faker.lorem.paragraph(),
    duration: overrides.duration || faker.number.int({ min: 30, max: 180 }), // <- corrigé
    level: overrides.level || faker.helpers.arrayElement(levels),
    price: overrides.price || parseFloat(faker.commerce.price(10, 500, 2)),
    published:
      overrides.published !== undefined
        ? overrides.published
        : faker.datatype.boolean(),
    instructor: overrides.instructor || faker.person.firstName() + " " + faker.person.lastName(),
    categoryId,
    ...overrides,
  };
};

// User Factory
const createUser = async (overrides = {}) => {
  const password = overrides.password || faker.internet.password(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    username: overrides.username || faker.internet.username(),
    email: overrides.email || faker.internet.email(),
    password: hashedPassword,
    role: overrides.role || faker.helpers.arrayElement(roles),
    ...overrides,
  };
};

module.exports = {
  createCategory,
  createCourse,
  createUser,
};
