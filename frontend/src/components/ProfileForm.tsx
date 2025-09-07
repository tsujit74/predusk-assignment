import { useState, useEffect } from "react";
import { createProfile, updateProfile } from "../api/profile";
import type { Profile, Work } from "../types/profile";

interface Props {
  initialData?: Profile;
  onSuccess: () => void;
}

export default function ProfileForm({ initialData, onSuccess }: Props) {
  const [form, setForm] = useState<Profile>({
    name: "",
    email: "",
    skills: [""],
    work: [{ role: "", company: "", startDate: "", endDate: "", description: "" }],
    ...initialData,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auto dismiss messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Basic field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Skills ---
  const handleSkillChange = (index: number, value: string) => {
    const skills = [...(form.skills || [])];
    skills[index] = value;
    setForm({ ...form, skills });
  };
  const addSkill = () => setForm({ ...form, skills: [...(form.skills || []), ""] });
  const removeSkill = (index: number) => {
    const skills = (form.skills || []).filter((_, i) => i !== index);
    setForm({ ...form, skills });
  };

  // --- Work Experience ---
  const handleWorkChange = (index: number, field: keyof Work, value: string) => {
    const work = [...(form.work || [])];
    work[index] = { ...work[index], [field]: value };
    setForm({ ...form, work });
  };
  const addWork = () =>
    setForm({
      ...form,
      work: [...(form.work || []), { role: "", company: "", startDate: "", endDate: "", description: "" }],
    });
  const removeWork = (index: number) => {
    const work = (form.work || []).filter((_, i) => i !== index);
    setForm({ ...form, work });
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      setError("Name is required");
      return;
    }

    try {
      if (initialData) {
        await updateProfile(form);
        setSuccess("Profile updated successfully!");
      } else {
        await createProfile(form);
        setSuccess("Profile created successfully!");
      }
      onSuccess();
    } catch (err) {
      console.error("Profile save failed", err);
      setError("Failed to save profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      {/* Toast Notifications */}
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        name="email"
        value={form.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full rounded"
      />

      {/* Skills */}
      <div className="space-y-2">
        <label className="font-semibold">Skills</label>
        {(form.skills || []).map((skill, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(idx, e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <button type="button" onClick={() => removeSkill(idx)} className="bg-red-500 text-white px-3 rounded">
              ✕
            </button>
          </div>
        ))}
        <button type="button" onClick={addSkill} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          + Add Skill
        </button>
      </div>

      {/* Work Experience */}
      <div className="space-y-2">
        <label className="font-semibold">Work Experience</label>
        {(form.work || []).map((w, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2 bg-gray-50">
            <input
              type="text"
              placeholder="Role"
              value={w.role || ""}
              onChange={(e) => handleWorkChange(idx, "role", e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Company"
              value={w.company || ""}
              onChange={(e) => handleWorkChange(idx, "company", e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="flex gap-2">
              <input
                type="date"
                placeholder="Start Date"
                value={w.startDate || ""}
                onChange={(e) => handleWorkChange(idx, "startDate", e.target.value)}
                className="border p-2 w-full rounded"
              />
              <input
                type="date"
                placeholder="End Date"
                value={w.endDate || ""}
                onChange={(e) => handleWorkChange(idx, "endDate", e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <textarea
              placeholder="Description"
              value={w.description || ""}
              onChange={(e) => handleWorkChange(idx, "description", e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button type="button" onClick={() => removeWork(idx)} className="bg-red-500 text-white px-3 py-1 rounded">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addWork} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          + Add Work
        </button>
      </div>

      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
        {initialData ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
}
