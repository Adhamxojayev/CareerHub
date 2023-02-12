import sequelize from "../utils/sequelize.js";
import Application from "./applications.js";
import Employer from "./employers.js";
import Worker from "./workers.js";
import Job from "./jobs.js";

Employer.hasMany(Job, {
  foreignKey: "employerId",
  onDelete: "cascade",
});

Job.belongsTo(Employer, {
  foreignKey: "employerId",
  onDelete: "cascade",
});

Worker.hasMany(Application, {
  foreignKey: "workerId",
  onDelete: "cascade",
});

Application.belongsTo(Worker, {
  foreignKey: "workerId",
  onDelete: "cascade",
});

Job.hasMany(Application, {
  foreignKey: "jobId",
  onDelete: "cascade",
});

Application.belongsTo(Job, {
  foreignKey: "jobId",
  onDelete: "cascade",
});

sequelize.sync();

export {
  Employer,
  Application,
  Worker,
  Job,
};
