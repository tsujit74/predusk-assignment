import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Get profile
export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

// Update profile
export const updateProfile = async (data: any) => {
  const res = await API.put("/profile", data);
  return res.data;
};
