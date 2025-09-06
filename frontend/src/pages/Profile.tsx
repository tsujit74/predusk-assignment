import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import Loading from "../components/Loading";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  if (!profile) return <Loading />;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-screen bg-gray-50 flex flex-col gap-6">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-2xl shadow-lg  transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{profile.name}</h1>
        <p className="text-gray-600 text-lg">{profile.email}</p>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Skills</h2>
        <ul className="flex flex-wrap gap-3">
          {profile.skills?.map((skill: string, idx: number) => (
            <li
              key={idx}
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm transform transition-transform duration-200 hover:scale-110 hover:bg-blue-600"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">Work Experience</h2>
        <ul className="space-y-6">
          {profile.work?.map((w: any, idx: number) => (
            <li
              key={idx}
              className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm transform transition-transform duration-300 hover:shadow-md hover:scale-105"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-lg font-semibold text-gray-800">
                  {w.role} at <span className="text-blue-600">{w.company}</span>
                </p>
                <p className="text-sm text-gray-500 font-light">
                  {new Date(w.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {w.endDate
                    ? new Date(w.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present"}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">{w.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
