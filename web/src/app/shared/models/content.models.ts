export interface Experience {
  company: string;
  role: string;
  timeline: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  technologies: string[];
  links?: {
    label: string;
    url: string;
  }[];
}
