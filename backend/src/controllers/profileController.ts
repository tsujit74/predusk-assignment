import { Request, Response, NextFunction } from "express";
import Profile from "../models/Profile";

export const getProfile = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) { next(err); }
};

export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Allow only one profile: replace if exists
    await Profile.deleteMany({});
    const p = await Profile.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(profile);
  } catch (err) { next(err); }
};

export const deleteProfile = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await Profile.deleteMany({});
    res.json({ success: true });
  } catch (err) { next(err); }
};
