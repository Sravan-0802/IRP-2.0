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
  { name: "Backend", slug: "backend", color: "teal" },
  { name: "Database", slug: "database", color: "amber" },
  { name: "System Design & Architecture", slug: "system-design", color: "violet" },
  { name: "Gen AI / Machine Learning", slug: "gen-ai-ml", color: "blue" },
  { name: "DevOps & Tools", slug: "devops", color: "indigo" },
  { name: "Core CS", slug: "core-cs", color: "teal" },
  { name: "Business & Domain Knowledge", slug: "business", color: "amber" },
];
