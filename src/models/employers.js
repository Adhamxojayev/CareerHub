import sequelize from "../utils/sequelize.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";

const Employer = sequelize.define(
  "Employer",
  {
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: {
        msg: 'employer this name exists'
      }
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
      allowNull: false
    },
  },
  {
    tableName: "employers",
  }
);

Employer.beforeCreate(async (employer) => {
  employer.password = await bcrypt.hash(employer.password, 10);
});

Employer.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default Employer;
