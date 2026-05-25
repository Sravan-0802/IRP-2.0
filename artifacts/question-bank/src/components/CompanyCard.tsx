import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CompanyGroup } from "../utils/groupByCompany";
import { QuestionItem } from "./QuestionItem";

interface CompanyCardProps {
  group: CompanyGroup;
  defaultExpanded: boolean;
  topicName: string;
}

const AVATAR_COLORS = [
  "bg-indigo-600",
  "bg-teal-600",
  "bg-rose-500",
  "bg-blue-600",
  "bg-amber-500",
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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
        aria-expanded={expanded}
      >
        <div
          className={`w-9 h-9 rounded flex-shrink-0 flex items-center justify-center text-white text-sm font-medium ${avatarColor}`}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{group.company}</p>
          <p className="text-xs text-gray-500">
            {group.questions.length} {topicName.toLowerCase()} question
            {group.questions.length !== 1 ? "s" : ""} &middot; {group.highImportanceCount} high
            importance
          </p>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>

      <div
        className={`transition-all duration-200 overflow-hidden ${
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          {visibleQuestions.map((q) => (
            <QuestionItem key={q.id} question={q} />
          ))}
          {!showAll && hiddenCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(true);
              }}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium text-left pt-1"
            >
              + {hiddenCount} more from {group.company}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
