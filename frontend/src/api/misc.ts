import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export const getTopSkills = async () => {
  const res = await API.get("/skills/top");
  return res.data;
};

export const searchAll = async (q: string) => {
  const res = await API.get("/search", { params: { q } });
  return res.data;
};
