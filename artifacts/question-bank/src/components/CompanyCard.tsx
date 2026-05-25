import { useState } from "react";
import { ChevronDown, ChevronRight, Flame } from "lucide-react";
import { CompanyGroup } from "../utils/groupByCompany";
import { QuestionItem } from "./QuestionItem";

interface CompanyCardProps {
  group: CompanyGroup;
  defaultExpanded: boolean;
  topicName: string;
}

const AVATAR_COLORS = [
  "bg-lime-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-amber-300",
  "bg-cyan-300",
  "bg-orange-300",
  "bg-rose-300",
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function CompanyCard({ group, defaultExpanded, topicName }: CompanyCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showAll, setShowAll] = useState(false);

  const colorIndex =
    group.company.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;
  const avatarColor = AVATAR_COLORS[colorIndex];

  const initials = getInitials(group.company);
  const visibleQuestions = showAll ? group.questions : group.questions.slice(0, 4);
  const hiddenCount = group.questions.length - 4;

  return (
    <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brut">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
        aria-expanded={expanded}
      >
        <div
          className={`w-11 h-11 rounded-xl border-2 border-black flex-shrink-0 flex items-center justify-center font-display font-black text-sm ${avatarColor}`}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-base text-black truncate">
            {group.company}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="font-display text-xs font-bold text-black/60 lowercase">
              {group.questions.length} {topicName.toLowerCase()} q
              {group.questions.length !== 1 ? "'s" : ""}
            </span>
            {group.highImportanceCount > 0 && (
              <span className="bg-pink-300 border border-black rounded-full px-2 py-0.5 font-display text-[10px] font-black uppercase tracking-wider flex items-center gap-0.5">
                <Flame className="w-3 h-3" strokeWidth={3} />
                {group.highImportanceCount} high
              </span>
            )}
          </div>
        </div>
        <div className="bg-black text-white rounded-full p-1 flex-shrink-0">
          {expanded ? (
            <ChevronDown className="w-4 h-4" strokeWidth={3} />
          ) : (
            <ChevronRight className="w-4 h-4" strokeWidth={3} />
          )}
        </div>
      </button>

      <div
        className={`transition-all duration-200 overflow-hidden ${
          expanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t-2 border-black bg-[#fef9f4] px-4 py-3 flex flex-col gap-2">
          {visibleQuestions.map((q) => (
            <QuestionItem key={q.id} question={q} />
          ))}
          {!showAll && hiddenCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(true);
              }}
              className="self-start bg-black text-lime-300 font-display font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mt-1 hover:bg-purple-600 hover:text-white transition-colors"
            >
              + {hiddenCount} more →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
