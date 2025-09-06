import express from "express";
import { health, getTopSkills, searchAll } from "../controllers/miscController";

const router = express.Router();

router.get("/health", health);
router.get("/skills/top", getTopSkills);
router.get("/search", searchAll);

export default router;
