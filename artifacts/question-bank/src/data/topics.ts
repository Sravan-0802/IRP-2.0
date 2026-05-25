export interface Topic {
  name: string;
  slug: string;
  color: string;
}

export const topics: Topic[] = [
  { name: "Frontend", slug: "frontend", color: "indigo" },
  { name: "Programming", slug: "programming", color: "violet" },
  { name: "Data Structures & Algorithms", slug: "dsa", color: "blue" },
  { name: "Behavioral & Communication", slug: "behavioral", color: "teal" },
  { name: "Resume/Project Based Questions", slug: "resume-project", color: "indigo" },
];
