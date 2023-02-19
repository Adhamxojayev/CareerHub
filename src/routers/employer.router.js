import { Router } from "express";
import controller from '../controllers/employer.controller.js'
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.get("/employer", controller.GET)
router.get("/employer/profile", checkToken, controller.GET_PROFILE);
router.get("/employer/:id", controller.GET_BYID)
router.post("/employer/login", controller.LOGIN)
router.post("/employer/register", controller.REGISTER)



export default router;
