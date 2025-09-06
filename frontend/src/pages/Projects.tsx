import { useEffect, useState } from "react";
import { getProjects } from "../api/project";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";
import type { Project } from "../types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects({ page, limit: 5 });
      setProjects(res.projects || []);
      setTotalPages(res.pages || 1);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      setError("Unable to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + page change
  useEffect(() => {
    fetchProjects();
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Explore Our Projects 🚀
      </h1>


      {/* Error state */}
      {error && (
        <p className="text-center text-red-600 mb-4 font-medium">{error}</p>
      )}

      {/* Projects list with responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((p) => <ProjectCard key={p._id} project={p} />)
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found. Try a different search.
            </p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
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
