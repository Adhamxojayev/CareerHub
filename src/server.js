import express from "express";
import { PORT } from "./utils/config.js";
import "./models/index.js";

// employer router
import employer from "./routers/employer.router.js";
import jobs from "./routers/jobs.router.js"

const app = express();

// express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers are merging
app.use("/api", employer);
app.use("/api", jobs);


// error handler
app.use((err, req, res, next) => {
  res.status(400).json({
    status: 400,
    message: err.message,
  });
});

app.listen(PORT, () => console.log("server is running on this port", PORT));
