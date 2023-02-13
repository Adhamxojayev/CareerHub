import { Router } from "express";
import checkToken from "../middlewares/checkToken.js";
import controller from "../controllers/jobs.controller.js";

const router = Router();

router.get("/jobs", controller.GET);
router.post("/jobs", checkToken, controller.POST)

export default router;
