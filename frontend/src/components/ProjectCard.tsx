import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="text-gray-600">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.skills?.map(skill => (
          <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{skill}</span>
        ))}
      </div>
    </div>
  );
}
