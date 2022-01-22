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
import cache from "../middlewares/cache";
import redisConnection from "../config/redis";
require("dotenv").config();

const router = express.Router();

const upload = multer({ storage: storage, fileFilter: filefilter });

const redis = redisConnection(process.env.REDIS_URL!);

router.get("/all", posters);
router.get("/:id", cache(redis), posterById);
router.post("/upload", upload.array("images", 10), uploads);
router.delete("/:id", deletePoster);
router.patch("/:id", updatePoster);
router.get("/image/:key", posterImage);

export default router;
