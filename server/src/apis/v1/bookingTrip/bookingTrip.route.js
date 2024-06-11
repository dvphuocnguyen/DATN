import { Router } from "express";
import bookingTripController from "./bookingTrip.controller.js";

const router = Router();

router.get("/", bookingTripController.getAll);
router.post("/", bookingTripController.create);
router.get("/:id", bookingTripController.getById);
router.patch("/:id", bookingTripController.update);

export default router;
