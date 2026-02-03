export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  category: 'engineering' | 'design' | 'marketing' | 'community' | 'product' | 'operations';
  salary: string;
  tags: string[];
  postedAt: Date;
  source: string;
  featured: boolean;
  remote: boolean;
}

export interface FilterState {
  category: string;
  type: string;
  search: string;
}