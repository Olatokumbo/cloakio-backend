import express from "express";
const router = express.Router();
import { newUser } from "../controllers/user";
import auth from "../middlewares/auth";

router.post("/new", auth, newUser);

export default router;
