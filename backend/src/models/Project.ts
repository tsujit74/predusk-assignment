import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  profile: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  links?: string[];
  skills?: string[];
}

const ProjectSchema = new Schema<IProject>(
  {
    profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    title: { type: String, required: true },
    description: String,
    links: [String],
    skills: [String]
  },
  { timestamps: true }
);

ProjectSchema.index({ title: "text", description: "text", skills: "text" });

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
