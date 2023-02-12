import sequelize from "../utils/sequelize.js";
import { DataTypes } from "sequelize";

const Application = sequelize.define("Application", {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'applications'
});


export default Application;
