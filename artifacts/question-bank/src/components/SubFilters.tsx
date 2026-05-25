import { ChevronDown, Flame } from "lucide-react";
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
    <div className="max-w-5xl mx-auto px-4 pb-5 flex flex-wrap gap-2 items-center">
      <button
        onClick={onHighImportanceToggle}
        className={`px-3 py-1.5 rounded-full font-display font-bold text-sm lowercase border-2 border-black transition-all flex items-center gap-1.5 ${
          highImportanceOnly
            ? "bg-pink-400 text-black shadow-brut-sm -translate-x-[1px] -translate-y-[1px]"
            : "bg-white text-black shadow-brut-sm hover:-translate-x-[1px] hover:-translate-y-[1px]"
        }`}
      >
        <Flame className="w-3.5 h-3.5" strokeWidth={2.5} />
        {highImportanceOnly ? "high only" : "show all"}
      </button>

      <SelectChip value={sort} onChange={(v) => onSortChange(v as SortOption)}>
        <option value="most-asked">most asked</option>
        <option value="alphabetical">a → z</option>
        <option value="high-importance-first">high first</option>
      </SelectChip>

      <SelectChip value={subtopic} onChange={onSubtopicChange}>
        <option value="">all subtopics</option>
        {subtopics.map((s) => (
          <option key={s} value={s}>
            {s.toLowerCase()}
          </option>
        ))}
      </SelectChip>
    </div>
  );
}

function SelectChip({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-1.5 font-display font-bold text-sm lowercase border-2 border-black rounded-full bg-white text-black shadow-brut-sm focus:outline-none hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none"
        strokeWidth={2.5}
      />
    </div>
  );
}
