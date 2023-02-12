import sequelize from "../utils/sequelize.js";
import { DataTypes } from "sequelize";

const Employer = sequelize.define(
  "Employer",
  {
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      validate: {
        isAlphanumeric: true,
        min: 8,
      },
    },
  },
  {
    tableName: "employers",
  }
);

export default Employer;
