import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../api/project";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { getProfile } from "../api/profile"; 
import Loading from "../components/Loading";
import type { Project } from "../types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects({ page, limit: 5 });
      setProjects(res.projects || []);
      setTotalPages(res.pages || 1);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      showMessage("error", "Unable to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  // --- Show temporary message ---
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000); // disappears after 3s
  };

  // --- Handlers ---
  const handleCreate = async (data: Partial<Project>) => {
    try {
      const profile = await getProfile();
      await createProject({ ...data, profile: profile._id });
      showMessage("success", "Project added successfully!");
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to add project. Please try again.");
    }
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!editing) return;
    try {
      await updateProject(editing._id, data);
      showMessage("success", "Project updated successfully!");
      setEditing(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to update project. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      showMessage("success", "Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to delete project. Please try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen bg-gray-50 space-y-10 relative">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
        Manage Projects 🚀
      </h1>

      {/* Toast Message */}
      {message && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg font-medium transition-all
          ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {message.text}
        </div>
      )}

      {/* Toggle Form Button */}
      {!showForm && !editing && (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Project
          </button>
        </div>
      )}

      {/* Project Form */}
      {(showForm || editing) && (
        <ProjectForm
          initialData={editing || undefined}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Projects list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((p) => (
            <div key={p._id} className="relative">
              <ProjectCard project={p} />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg">No projects found. Add one to get started!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${
              page <= 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="font-bold text-lg text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${
              page >= totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
