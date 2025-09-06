import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";
import mongoose from "mongoose";

// Create
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    // validate minimal fields
    if (!payload.title || !payload.profile) return res.status(400).json({ error: "title & profile required" });
    const p = await Project.create(payload);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

// Get list with pagination & filters
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skill, q, page = "1", limit = "10" } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page));
    const lim = Math.max(1, Math.min(100, parseInt(limit)));
    const skip = (pageNum - 1) * lim;

    const filter: any = {};
    if (skill) filter.skills = { $regex: new RegExp(skill, "i") }; // partial match
    if (q) filter.$text = { $search: q };

    const [total, projects] = await Promise.all([
      Project.countDocuments(filter),
      Project.find(filter).skip(skip).limit(lim).lean()
    ]);

    res.json({
      total,
      page: pageNum,
      limit: lim,
      pages: Math.ceil(total / lim),
      projects
    });
  } catch (err) { next(err); }
};

// Get by id
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
    const proj = await Project.findById(id).lean();
    if (!proj) return res.status(404).json({ error: "Not found" });
    res.json(proj);
  } catch (err) { next(err); }
};

// Update
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) { next(err); }
};

// Delete
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
    await Project.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) { next(err); }
};
