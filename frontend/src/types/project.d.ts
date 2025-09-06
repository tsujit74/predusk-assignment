export interface Project {
  _id: string;
  profile: string;
  title: string;
  description?: string;
  links?: string[];
  skills?: string[];
  createdAt: string;
  updatedAt: string;
}
