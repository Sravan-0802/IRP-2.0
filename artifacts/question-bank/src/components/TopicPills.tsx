import { questions } from "../data/questions";
import { topics } from "../data/topics";

interface TopicPillsProps {
  selected: string;
  onSelect: (topic: string) => void;
}

export function TopicPills({ selected, onSelect }: TopicPillsProps) {
  const countByTopic = Object.fromEntries(
    topics.map((t) => [
      t.name,
      questions.filter((q) => q.topic === t.name).length,
    ])
  );

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {topics.map((topic) => {
            const isSelected = selected === topic.name;
            return (
              <button
                key={topic.slug}
                onClick={() => onSelect(topic.name)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap ${
                  isSelected
                    ? "bg-indigo-100 text-indigo-900 border-indigo-300 font-medium"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                {topic.name} &middot; {countByTopic[topic.name] ?? 0}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
