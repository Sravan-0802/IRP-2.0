import { ChevronDown } from "lucide-react";
import { Question } from "../data/questions";

export type SortOption = "most-asked" | "alphabetical" | "high-importance-first";

interface SubFiltersProps {
  questions: Question[];
  highImportanceOnly: boolean;
  onHighImportanceToggle: () => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  subtopic: string;
  onSubtopicChange: (subtopic: string) => void;
}

export function SubFilters({
  questions,
  highImportanceOnly,
  onHighImportanceToggle,
  sort,
  onSortChange,
  subtopic,
  onSubtopicChange,
}: SubFiltersProps) {
  const subtopics = Array.from(new Set(questions.map((q) => q.subtopic))).sort();

  return (
    <div className="max-w-5xl mx-auto px-4 pb-4 flex flex-wrap gap-2 items-center">
      <button
        onClick={onHighImportanceToggle}
        className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
          highImportanceOnly
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
        }`}
      >
        {highImportanceOnly ? "High importance only" : "All companies"}
      </button>

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="most-asked">Most asked</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="high-importance-first">High importance first</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={subtopic}
          onChange={(e) => onSubtopicChange(e.target.value)}
          className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="">All subtopics</option>
          {subtopics.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
