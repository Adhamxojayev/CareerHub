import { Router } from "express";
import controller from "../controllers/application.controller.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.get("/application", controller.GET);
router.post("/application", checkToken, controller.POST)

export default router;
