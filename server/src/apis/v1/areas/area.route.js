import { Router } from "express";
import areaController from "./area.controller.js";

const router = Router();

router.get("/", areaController.getAll);
router.post("/", areaController.create);
router.get("/:id", areaController.getById);
router.patch("/:id", areaController.update);

export default router;
