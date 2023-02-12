import sequelize from "../utils/sequelize.js";
import { DataTypes } from "sequelize";

const Job = sequelize.define(
  "Job",
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'jobs'
  }
);

export default Job;
