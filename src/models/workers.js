import sequelize from "../utils/sequelize.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";


const Worker = sequelize.define(
  "Worker",
  {
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: {
        msg: "worker this name exists",
      },
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
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "workers",
  }
);

Worker.beforeCreate(async (employer) => {
  employer.password = await bcrypt.hash(employer.password, 10);
});

Worker.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default Worker;
