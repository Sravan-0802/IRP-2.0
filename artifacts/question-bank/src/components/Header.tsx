import { Search } from "lucide-react";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalQuestions: number;
}

export function Header({ search, onSearchChange, totalQuestions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-1.5">
            <img
              src={`${import.meta.env.BASE_URL}nxtwave-academy-logo.png`}
              alt="NxtWave Academy"
              className="h-7 w-auto"
            />
          </div>
          <p className="text-lg font-bold text-gray-900 leading-tight">
            Internship preparation intelligence
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {totalQuestions} real questions &middot; 12 topics &middot; collected from internship interviews
          </p>
        </div>
        <div className="relative flex-shrink-0 w-56 sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
}
