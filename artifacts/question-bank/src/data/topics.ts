export interface Topic {
  name: string;
  slug: string;
  color: string;
}

export const topics: Topic[] = [
  { name: "Resume/Project Based Questions", slug: "resume-project", color: "indigo" },
  { name: "Behavioral & Communication", slug: "behavioral", color: "teal" },
  { name: "Programming", slug: "programming", color: "violet" },
  { name: "Data Structures & Algorithms", slug: "dsa", color: "blue" },
  { name: "Frontend", slug: "frontend", color: "indigo" },
];
