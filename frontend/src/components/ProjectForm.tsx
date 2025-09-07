import { useState, useEffect } from "react";
import type { Project } from "../types/project";

interface Props {
  initialData?: Partial<Project>;
  onSubmit: (data: Partial<Project>) => void;
  onCancel?: () => void;
}

export default function ProjectForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Project>>({
    title: "",
    description: "",
    skills: [],
    links: [],
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, skills: e.target.value.split(",").map((t) => t.trim()) });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, links: e.target.value ? [e.target.value] : [] });
  };

  const handleSubmit = () => {
    if (!form.title || !form.description) {
      alert("Title and description are required");
      return;
    }

    onSubmit(form);
    setForm({ title: "", description: "", skills: [], links: [] });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Project" : "Add New Project"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={form.title || ""}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description || ""}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills?.join(", ") || ""}
        onChange={handleSkillsChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="text"
        name="links"
        placeholder="Project Link"
        value={form.links?.[0] || ""}
        onChange={handleLinkChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <div className="flex gap-2">
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {initialData ? "Update" : "Save"}
        </button>
        {onCancel && (
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
