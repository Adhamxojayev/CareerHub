import { Router } from "express";
import upload from "../utils/multer.js";
import controller from "../controllers/worker.controller.js";

const router = Router();

router.get("/worker", controller.GET);
router.get("/worker/:id", controller.GET_BYID);
router.post("/worker/login", controller.LOGIN);
router.post("/worker/register", upload.single('resume'), controller.REGISTER);

export default router;
