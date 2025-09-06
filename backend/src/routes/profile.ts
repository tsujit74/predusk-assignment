import express from "express";
import { getProfile, createProfile, updateProfile, deleteProfile } from "../controllers/profileController";

const router = express.Router();

router.get("/", getProfile);
router.post("/", createProfile);
router.put("/", updateProfile);
router.delete("/", deleteProfile);

export default router;
