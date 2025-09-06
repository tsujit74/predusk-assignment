import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Get projects with optional search, page, limit
export const getProjects = async (params?: { search?: string; page?: number; limit?: number }) => {
  const res = await API.get("/projects", { params });
  return res.data;
};

// Get project by ID
export const getProjectById = async (id: string) => {
  const res = await API.get(`/projects/${id}`);
  return res.data;
};

