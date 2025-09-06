export interface Work {
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Profile {
  name: string;
  email?: string;
  education?: string[];
  skills?: string[];
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  work?: Work[];
}
