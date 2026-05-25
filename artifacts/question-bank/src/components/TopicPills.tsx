import { questions } from "../data/questions";
import { topics } from "../data/topics";

interface TopicPillsProps {
  selected: string;
  onSelect: (topic: string) => void;
}

const PILL_COLORS = [
  "bg-lime-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-amber-300",
  "bg-cyan-300",
];

const SHORT_NAMES: Record<string, string> = {
  "Frontend": "frontend",
  "Programming": "programming",
  "Data Structures & Algorithms": "dsa",
  "Behavioral & Communication": "behavioral",
  "Resume/Project Based Questions": "resume + projects",
};

export function TopicPills({ selected, onSelect }: TopicPillsProps) {
  const countByTopic = Object.fromEntries(
    topics.map((t) => [
      t.name,
      questions.filter((q) => q.topic === t.name).length,
    ])
  );

  return (
    <div className="bg-[#fef9f4] border-b-2 border-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
          {topics.map((topic, i) => {
            const isSelected = selected === topic.name;
            const color = PILL_COLORS[i % PILL_COLORS.length];
            const short = SHORT_NAMES[topic.name] ?? topic.name.toLowerCase();
            return (
              <button
                key={topic.slug}
                onClick={() => onSelect(topic.name)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-display font-bold text-sm lowercase border-2 border-black transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? `${color} shadow-brut -translate-x-[2px] -translate-y-[2px]`
                    : "bg-white shadow-brut-sm hover:-translate-x-[1px] hover:-translate-y-[1px]"
                }`}
              >
                <span>{short}</span>
                <span
                  className={`text-xs font-black px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-black text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {countByTopic[topic.name] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
