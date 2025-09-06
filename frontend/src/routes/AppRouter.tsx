import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Projects from "../pages/Projects";
import Search from "../pages/Search";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
