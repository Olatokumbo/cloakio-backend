import express from "express";
import { posters, posterById, uploads, posterImage } from "../controllers/poster";
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/all", posters);
router.get("/:id", posterById);
router.post("/upload", upload.array("posters", 10), uploads);
router.get("/image/:key", posterImage);

export default router;
