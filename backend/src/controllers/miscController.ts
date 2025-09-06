import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";
import Profile from "../models/Profile";

// Health
export const health = (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
};

// Top skills aggregation
export const getTopSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.max(1, Math.min(50, parseInt((req.query.limit as string) || "10")));
    const result = await Project.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { skill: "$_id", count: 1, _id: 0 } }
    ]);
    res.json(result);
  } catch (err) { next(err); }
};

// Search across projects & profiles
export const searchAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = (req.query.q as string) || "";
    const projectQuery = q ? { $text: { $search: q } } : {};
    const profileQuery = q ? { $text: { $search: q } } : {};

    const [projects, profiles] = await Promise.all([
      Project.find(projectQuery).limit(50).lean(),
      Profile.find(profileQuery).limit(50).lean()
    ]);

    res.json({ projects, profiles });
  } catch (err) { next(err); }
};
