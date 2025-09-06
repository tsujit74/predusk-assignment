import mongoose, { Schema, Document } from "mongoose";

export interface IWork {
  company?: string;
  role?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface IProfile extends Document {
  name: string;
  email?: string;
  education?: string[];
  skills?: string[];
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  work?: IWork[];
}

const WorkSchema = new Schema<IWork>(
  {
    company: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String
  },
  { _id: false }
);

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    email: String,
    education: [String],
    skills: [String],
    links: {
      github: String,
      linkedin: String,
      portfolio: String
    },
    work: [WorkSchema]
  },
  { timestamps: true }
);

ProfileSchema.index({ name: "text", skills: "text" });

const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
export default Profile;
