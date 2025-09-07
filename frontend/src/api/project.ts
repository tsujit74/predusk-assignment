import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Get projects with optional search, page, limit
export const getProjects = async (params?: { search?: string; page?: number; limit?: number }) => {
  const res = await API.get("/projects", { params });
  return res.data;
};

// Get single project by ID
export const getProjectById = async (id: string) => {
  const res = await API.get(`/projects/${id}`);
  return res.data;
};

// Create new project
export const createProject = async (data: any) => {
  const res = await API.post("/projects", data);
  return res.data;
};

// Update existing project
export const updateProject = async (id: string, data: any) => {
  const res = await API.put(`/projects/${id}`, data);
  return res.data;
};

// Delete project
export const deleteProject = async (id: string) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};
