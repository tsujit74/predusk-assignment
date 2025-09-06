import { useEffect, useState } from "react";
import { getTopSkills } from "../api/misc";
import Loading from "../components/Loading";

interface Skill {
  skill: string;
  count: number;
}

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getTopSkills();
        setSkills(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load skills. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Top Skills</h1>

      {skills.length === 0 ? (
        <p className="text-gray-500">No skills available right now.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <li
              key={s.skill}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-lg shadow-sm hover:bg-green-200 transition"
            >
              {s.skill} <span className="text-sm text-gray-600">({s.count})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
