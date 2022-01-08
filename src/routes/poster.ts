import express from "express";
import { posters, posterById } from "../controllers/poster";
const router = express.Router();

router.get("/all", posters);
router.get("/:id", posterById);

export default router;
