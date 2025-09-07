import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Get profile
export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

// Create profile (replace if already exists)
export const createProfile = async (data: any) => {
  const res = await API.post("/profile", data);
  return res.data;
};

// Update profile
export const updateProfile = async (data: any) => {
  const res = await API.put("/profile", data);
  return res.data;
};

// Delete profile
export const deleteProfile = async () => {
  const res = await API.delete("/profile");
  return res.data;
};
