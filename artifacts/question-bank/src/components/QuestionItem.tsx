import { Question } from "../data/questions";
import { Flame } from "lucide-react";

interface QuestionItemProps {
  question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
  if (question.highImportance) {
    return (
      <div className="bg-pink-200 border-2 border-black rounded-lg px-3 py-2.5 shadow-brut-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-black text-pink-300 font-display text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3" strokeWidth={3} />
            high
          </span>
          <span className="font-display text-[10px] font-bold text-black/70 uppercase tracking-wider">
            {question.subtopic}
          </span>
        </div>
        <p className="text-sm font-medium text-black leading-snug">{question.question}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black/10 rounded-lg px-3 py-2.5 hover:border-black/30 transition-colors">
      <p className="font-display text-[10px] font-bold text-black/40 uppercase tracking-wider mb-0.5">
        {question.subtopic}
      </p>
      <p className="text-sm text-black leading-snug">{question.question}</p>
    </div>
  );
}
