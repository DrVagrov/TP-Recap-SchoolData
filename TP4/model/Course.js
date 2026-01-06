const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Category = require("./Category");

const Course = db.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("débutant", "intermédiaire", "avancé"),
      defaultValue: "débutant",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "courses",
    timestamps: true,
  }
);

module.exports = Course;
