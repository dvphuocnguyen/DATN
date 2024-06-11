import { Router } from "express";
import placeController from "./place.controller.js";

const router = Router();

router.get("/", placeController.getAll);
router.post("/", placeController.create);
router.get("/:id", placeController.getById);
router.patch("/:id", placeController.update);

export default router;
