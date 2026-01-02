
export interface Post {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Topic {
  name: string;
  count?: number;
}
