import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  logging: false,
  dialect: "postgres",
});

!(async function () {
  try {
    await sequelize.authenticate();
    console.log("connection db");
  } catch (error) {
    console.log("connection error: ", error.message);
  }
})();

export default sequelize;
