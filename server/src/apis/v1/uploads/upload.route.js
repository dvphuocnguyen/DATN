import { Router } from "express";
import uploadController from "./upload.controller.js";
import { upload } from "../../../utils/index.js";

const router = Router();

router.post("/local/file", upload.single("file"), uploadController.uploadFromLocalFile);
router.post("/local/files", upload.array("files", 10), uploadController.uploadFromLocalFiles);

export default router;
