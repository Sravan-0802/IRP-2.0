interface EmptyStateProps {
  hasSearch: boolean;
}

export function EmptyState({ hasSearch }: EmptyStateProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-lg font-light">?</span>
        </div>
      </div>
      <p className="text-base font-medium text-gray-700 mb-1">No questions match</p>
      <p className="text-sm text-gray-500">
        {hasSearch
          ? "Try a different search term, topic, or clear the filters."
          : "Try a different topic or clear the search."}
      </p>
    </div>
  );
}
