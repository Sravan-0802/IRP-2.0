import { Question } from "../data/questions";

export interface CompanyGroup {
  company: string;
  questions: Question[];
  highImportanceCount: number;
}

export function groupByCompany(questions: Question[]): CompanyGroup[] {
  const map = new Map<string, Question[]>();

  for (const q of questions) {
    for (const company of q.companies) {
      if (!map.has(company)) {
        map.set(company, []);
      }
      map.get(company)!.push(q);
    }
  }

  const groups: CompanyGroup[] = [];
  for (const [company, qs] of map.entries()) {
    const unique = Array.from(new Map(qs.map((q) => [q.id, q])).values());
    groups.push({
      company,
      questions: unique,
      highImportanceCount: unique.filter((q) => q.highImportance).length,
    });
  }

  return groups.sort((a, b) => b.questions.length - a.questions.length);
}
