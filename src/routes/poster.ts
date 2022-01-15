import express from "express";
import {
  posters,
  posterById,
  uploads,
  posterImage,
  deletePoster,
  updatePoster,
} from "../controllers/poster";
import { storage, filefilter } from "../config/multer";

import multer from "multer";

const router = express.Router();

const upload = multer({ storage: storage, fileFilter: filefilter });

router.get("/all", posters);
router.get("/:id", posterById);
router.post("/upload", upload.array("posters", 10), uploads);
router.delete("/:id/delete", deletePoster);
router.patch("/:id/update", updatePoster);
router.get("/image/:key", posterImage);

export default router;
