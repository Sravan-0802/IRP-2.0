import { Question } from "../data/questions";

interface TopicStatsProps {
  topicName: string;
  questions: Question[];
}

export function TopicStats({ topicName, questions }: TopicStatsProps) {
  const highImportanceCount = questions.filter((q) => q.highImportance).length;
  const companies = new Set(questions.flatMap((q) => q.companies)).size;
  const subtopics = new Set(questions.map((q) => q.subtopic)).size;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-0.5">{topicName}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {questions.length} questions &middot; {subtopics} subtopics &middot; grouped by company
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="High importance" value={highImportanceCount} />
        <StatCard label="Companies asking" value={companies} />
        <StatCard label="Subtopics" value={subtopics} />
        <StatCard label="Total questions" value={questions.length} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-100 rounded-md px-3 py-2.5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900">{value}</p>
    </div>
  );
}
