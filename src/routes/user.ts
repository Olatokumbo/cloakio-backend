import express from "express";
const router = express.Router();
import { newUser } from "../controllers/user";

router.post("/new", newUser);

export default router;
