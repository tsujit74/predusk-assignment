import { useState, useEffect } from "react";
import { searchAll } from "../api/misc";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";
import debounce from "lodash.debounce";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search to avoid frequent API calls
  const performSearch = debounce(async (q: string) => {
    if (!q) {
      setResults(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await searchAll(q);
      setResults(res);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Try again later.");
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    performSearch(query);
    return performSearch.cancel;
  }, [query]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Search Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search projects or profiles..."
          className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => performSearch(query)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Results */}
      {!loading && results && (
        <div className="space-y-8">
          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            {results.projects.length === 0 ? (
              <p className="text-gray-500">No projects found for "{query}"</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {results.projects.map((p: any) => (
                  <ProjectCard key={p._id} project={p} />
                ))}
              </div>
            )}
          </div>

          {/* Profiles */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Profiles</h2>
            {results.profiles.length === 0 ? (
              <p className="text-gray-500">No profiles found for "{query}"</p>
            ) : (
              <ul className="space-y-3">
                {results.profiles.map((p: any) => (
                  <li
                    key={p._id}
                    className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      {p.email && <p className="text-gray-500 text-sm">{p.email}</p>}
                      {p.skills && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {p.skills.map((skill: string) => (
                            <span
                              key={skill}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <a
                      href={p.links?.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      GitHub
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
