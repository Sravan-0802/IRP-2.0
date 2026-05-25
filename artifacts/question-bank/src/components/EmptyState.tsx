interface EmptyStateProps {
  hasSearch: boolean;
}

export function EmptyState({ hasSearch }: EmptyStateProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center">
      <div className="bg-purple-300 border-2 border-black rounded-2xl px-6 py-8 shadow-brut max-w-md">
        <div className="font-display font-black text-6xl mb-2">¯\_(ツ)_/¯</div>
        <p className="font-display font-black text-xl text-black mb-1 lowercase">
          nothing here
        </p>
        <p className="text-sm text-black/70 font-medium">
          {hasSearch
            ? "try a different search, switch topics, or reset the filters."
            : "try a different topic."}
        </p>
      </div>
    </div>
  );
}
