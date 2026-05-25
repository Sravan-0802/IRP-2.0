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

  // All questions for the selected topic (used for stats/filters)
  const topicQuestions = useMemo(
    () => questions.filter((q) => q.topic === selectedTopic),
    [selectedTopic]
  );

  // Filtered questions based on all active filters
  const filteredQuestions = useMemo(() => {
    let result = topicQuestions;

    if (highImportanceOnly) {
      result = result.filter((q) => q.highImportance);
    }

    if (selectedSubtopic) {
      result = result.filter((q) => q.subtopic === selectedSubtopic);
    }

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

  // Group by company and sort
  const companyGroups = useMemo(() => {
    let groups = groupByCompany(filteredQuestions);

    if (sort === "alphabetical") {
      groups = [...groups].sort((a, b) => a.company.localeCompare(b.company));
    } else if (sort === "high-importance-first") {
      groups = [...groups].sort((a, b) => b.highImportanceCount - a.highImportanceCount);
    }
    // "most-asked" is already the default sort from groupByCompany

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
    <div className="min-h-screen bg-gray-50 font-sans">
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

        <div className="max-w-5xl mx-auto px-4 pb-12">
          {companyGroups.length === 0 ? (
            <EmptyState hasSearch={hasFilters} />
          ) : (
            <div className="flex flex-col gap-3">
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
      </main>
    </div>
  );
}
