import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import Loading from "../components/Loading";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Fetch Profile ---
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- Toast Message ---
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-screen bg-gray-50 flex flex-col gap-6 relative">

      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg font-medium transition-all
          ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {message.text}
        </div>
      )}

      {!editing ? (
        <>
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{profile.name || "No Name"}</h1>
            <p className="text-gray-600 text-lg">{profile.email || "No Email"}</p>

            {/* Skills */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              {profile.skills?.length ? (
                <ul className="flex flex-wrap gap-3">
                  {profile.skills.map((skill: string, idx: number) => (
                    <li key={idx} className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No skills added yet.</p>
              )}
            </div>

            {/* Work Experience */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
              {profile.work?.length ? (
                <div className="space-y-4">
                  {profile.work.map((w: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 border p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                      <p className="text-lg font-semibold">{w.role} at <span className="text-blue-600">{w.company}</span></p>
                      <p className="text-sm text-gray-500">
                        {new Date(w.startDate).toLocaleDateString()} - {w.endDate ? new Date(w.endDate).toLocaleDateString() : "Present"}
                      </p>
                      <p className="text-gray-700 mt-2">{w.description || <span className="italic text-gray-400">No description</span>}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No work experience added yet.</p>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="text-center">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <ProfileForm
          initialData={profile}
          onSuccess={async () => {
            try {
              await fetchProfile();
              showMessage("success", "Profile updated successfully!");
            } catch {
              showMessage("error", "Failed to update profile.");
            } finally {
              setEditing(false);
            }
          }}
        />
      )}
    </div>
  );
}
