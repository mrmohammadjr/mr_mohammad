export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image_url: string;
  year: string;
  category: string;
  technologies: string[];
  github: string | null;
  live: string;
  sort_order: number;
}