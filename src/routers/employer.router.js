import { Router } from "express";
import controller from '../controllers/employer.controller.js'

const router = Router();

router.route("/employer")
      .get(controller.GET);

export default router;
