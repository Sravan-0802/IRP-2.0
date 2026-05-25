import { Question } from "../data/questions";

interface QuestionItemProps {
  question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
  if (question.highImportance) {
    return (
      <div className="flex gap-3 pl-3 border-l-[3px] border-amber-400 bg-amber-50 rounded-r-md py-2 pr-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide">
              HIGH
            </span>
            <span className="text-[11px] font-medium text-amber-700 uppercase tracking-wide">
              {question.subtopic}
            </span>
          </div>
          <p className="text-sm text-amber-900 leading-snug">{question.question}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-md py-2 px-3">
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">
        {question.subtopic}
      </p>
      <p className="text-sm text-gray-800 leading-snug">{question.question}</p>
    </div>
  );
}
