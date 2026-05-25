import { Question } from "../data/questions";
import { Flame, Building2, Layers, Database } from "lucide-react";

interface TopicStatsProps {
  topicName: string;
  questions: Question[];
}

export function TopicStats({ topicName, questions }: TopicStatsProps) {
  const highImportanceCount = questions.filter((q) => q.highImportance).length;
  const companies = new Set(questions.flatMap((q) => q.companies)).size;
  const subtopics = new Set(questions.map((q) => q.subtopic)).size;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-5">
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <h2 className="font-display font-black text-3xl text-black lowercase">
          {topicName}
        </h2>
        <span className="font-display font-bold text-sm text-black/50">
          // grouped by company
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        <StatCard label="high importance" value={highImportanceCount} color="bg-pink-300" icon={<Flame className="w-4 h-4" strokeWidth={2.5} />} />
        <StatCard label="companies" value={companies} color="bg-lime-300" icon={<Building2 className="w-4 h-4" strokeWidth={2.5} />} />
        <StatCard label="subtopics" value={subtopics} color="bg-purple-300" icon={<Layers className="w-4 h-4" strokeWidth={2.5} />} />
        <StatCard label="total q's" value={questions.length} color="bg-cyan-300" icon={<Database className="w-4 h-4" strokeWidth={2.5} />} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`${color} border-2 border-black rounded-xl px-4 py-3 shadow-brut-sm`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <p className="font-display font-bold text-xs uppercase tracking-wide">{label}</p>
      </div>
      <p className="font-display font-black text-3xl text-black">{value}</p>
    </div>
  );
}
