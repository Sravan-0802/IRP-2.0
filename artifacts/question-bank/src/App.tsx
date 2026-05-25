import { useState, useMemo } from "react";
import { questions } from "./data/questions";
import { Header } from "./components/Header";
import { TopicPills } from "./components/TopicPills";
import { TopicStats } from "./components/TopicStats";
import { SubFilters, SortOption } from "./components/SubFilters";
import { CompanyCard } from "./components/CompanyCard";
import { EmptyState } from "./components/EmptyState";
import { groupByCompany } from "./utils/groupByCompany";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState("Frontend");
  const [search, setSearch] = useState("");
  const [highImportanceOnly, setHighImportanceOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("most-asked");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");

  const topicQuestions = useMemo(
    () => questions.filter((q) => q.topic === selectedTopic),
    [selectedTopic]
  );

  const filteredQuestions = useMemo(() => {
    let result = topicQuestions;
    if (highImportanceOnly) result = result.filter((q) => q.highImportance);
    if (selectedSubtopic) result = result.filter((q) => q.subtopic === selectedSubtopic);
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(term) ||
          q.subtopic.toLowerCase().includes(term) ||
          q.companies.some((c) => c.toLowerCase().includes(term))
      );
    }
    return result;
  }, [topicQuestions, highImportanceOnly, selectedSubtopic, search]);

  const companyGroups = useMemo(() => {
    let groups = groupByCompany(filteredQuestions);
    if (sort === "alphabetical") {
      groups = [...groups].sort((a, b) => a.company.localeCompare(b.company));
    } else if (sort === "high-importance-first") {
      groups = [...groups].sort((a, b) => b.highImportanceCount - a.highImportanceCount);
    }
    return groups;
  }, [filteredQuestions, sort]);

  const hasFilters = !!(search.trim() || highImportanceOnly || selectedSubtopic);

  function handleTopicChange(topic: string) {
    setSelectedTopic(topic);
    setSelectedSubtopic("");
    setHighImportanceOnly(false);
    setSearch("");
  }

  return (
    <div className="min-h-screen bg-[#fef9f4] bg-grain font-sans">
      <Header
        search={search}
        onSearchChange={setSearch}
        totalQuestions={questions.length}
      />
      <TopicPills selected={selectedTopic} onSelect={handleTopicChange} />

      <main>
        <TopicStats topicName={selectedTopic} questions={topicQuestions} />

        <SubFilters
          questions={topicQuestions}
          highImportanceOnly={highImportanceOnly}
          onHighImportanceToggle={() => setHighImportanceOnly((p) => !p)}
          sort={sort}
          onSortChange={setSort}
          subtopic={selectedSubtopic}
          onSubtopicChange={setSelectedSubtopic}
        />

        <div className="max-w-5xl mx-auto px-4 pb-16">
          {companyGroups.length === 0 ? (
            <EmptyState hasSearch={hasFilters} />
          ) : (
            <div className="flex flex-col gap-4">
              {companyGroups.map((group, index) => (
                <CompanyCard
                  key={group.company}
                  group={group}
                  defaultExpanded={index < 2}
                  topicName={selectedTopic}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="border-t-2 border-black bg-black text-white py-6">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
            <p className="font-display font-bold text-sm lowercase">
              made with <span className="text-pink-400">♥</span> by nxtwave academy
            </p>
            <p className="font-display font-bold text-xs text-lime-300 uppercase tracking-widest">
              go get that bag ✦
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
