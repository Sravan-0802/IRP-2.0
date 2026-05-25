import { Search, Sparkles } from "lucide-react";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalQuestions: number;
}

const MARQUEE_ITEMS = [
  "real questions",
  "no fluff",
  "from actual interviews",
  "lock in",
  "ship it",
  "you got this",
  "internship szn",
  "no cap",
];

export function Header({ search, onSearchChange, totalQuestions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30">
      {/* Marquee strip */}
      <div className="bg-black text-lime-300 overflow-hidden border-b-2 border-black">
        <div className="flex gap-8 py-1.5 animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-display font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              {item}
              <span className="text-pink-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-[#fef9f4] border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-white border-2 border-black rounded-xl px-2 py-1.5 shadow-brut-sm flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}nxtwave-academy-logo.png`}
                alt="NxtWave Academy"
                className="h-6 w-auto"
              />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-lime-300 border-2 border-black rounded-full px-3 py-1">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="font-display font-bold text-xs uppercase tracking-wide">
                {totalQuestions}+ q's loaded
              </span>
            </div>
          </div>

          <div className="relative flex-shrink-0 w-48 sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-4 pointer-events-none"
              strokeWidth={2.5}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="search the vault..."
              className="w-full pl-9 pr-3 py-2 text-sm font-medium border-2 border-black rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:shadow-brut-sm focus:-translate-x-[2px] focus:-translate-y-[2px] transition-all"
            />
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-5xl mx-auto px-4 pb-6 pt-2">
          <div className="flex items-end gap-3 flex-wrap">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-black">
              the interview
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">vault</span>
                <span className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-pink-400 -z-0 -skew-x-6"></span>
              </span>
              <span className="text-pink-500">.</span>
            </h1>
            <span className="font-display font-bold text-base text-black/60 pb-1.5">
              ↘ real questions, real companies
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
