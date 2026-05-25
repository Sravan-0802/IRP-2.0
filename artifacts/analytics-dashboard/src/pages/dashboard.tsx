import { useState, useEffect, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAnalyticsSummary,
  getGetAnalyticsSummaryQueryKey,
  useGetAnalyticsDaily,
  getGetAnalyticsDailyQueryKey,
  useGetAnalyticsTopClicks,
  getGetAnalyticsTopClicksQueryKey,
  useGetRecentSessions,
  getGetRecentSessionsQueryKey,
  useGetFeedback,
  getGetFeedbackQueryKey,
} from "@workspace/api-client-react";
import { CSVLink } from "react-csv";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RefreshCw, ArrowUp, ArrowDown, ChevronDown, Check,
  Sun, Moon, Download, Printer, MousePointerClick, Users, Clock, Activity, Globe
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CHART_COLORS = {
  blue: "#0079F2",
  purple: "#795EFF",
  green: "#009118",
  red: "#A60808",
  pink: "#ec4899",
};

const DATA_SOURCES: string[] = ["App DB"];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateDisplay(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "6px",
        padding: "10px 14px",
        border: "1px solid #e0e0e0",
        color: "#1a1a1a",
        fontSize: "13px",
      }}
    >
      <div style={{ marginBottom: "6px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
        {label}
      </div>
      {payload.map((entry: any, index: number) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
          {payload.length > 0 && entry.color && entry.color !== "#ffffff" && (
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", backgroundColor: entry.color, flexShrink: 0 }} />
          )}
          <span style={{ color: "#444" }}>{entry.name}</span>
          <span style={{ marginLeft: "auto", fontWeight: 600 }}>
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isDark, setIsDark] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIntervalMs, setSelectedIntervalMs] = useState(5 * 60 * 1000);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const summaryQuery = useGetAnalyticsSummary({ query: { queryKey: getGetAnalyticsSummaryQueryKey() } });
  const dailyQuery = useGetAnalyticsDaily({ query: { queryKey: getGetAnalyticsDailyQueryKey() } });
  const topClicksQuery = useGetAnalyticsTopClicks({ query: { queryKey: getGetAnalyticsTopClicksQueryKey() } });
  const recentSessionsQuery = useGetRecentSessions({ query: { queryKey: getGetRecentSessionsQueryKey() } });
  const feedbackQuery = useGetFeedback({ query: { queryKey: getGetFeedbackQueryKey() } });

  const loading = summaryQuery.isLoading || summaryQuery.isFetching ||
    dailyQuery.isLoading || dailyQuery.isFetching ||
    topClicksQuery.isLoading || topClicksQuery.isFetching ||
    recentSessionsQuery.isLoading || recentSessionsQuery.isFetching;

  useEffect(() => {
    if (loading) {
      setIsSpinning(true);
    } else {
      const t = setTimeout(() => setIsSpinning(false), 600);
      return () => clearTimeout(t);
    }
  }, [loading]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: getGetAnalyticsSummaryQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetAnalyticsDailyQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetAnalyticsTopClicksQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetRecentSessionsQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetFeedbackQueryKey() });
  };

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(handleRefresh, selectedIntervalMs);
    return () => clearInterval(interval);
  }, [autoRefresh, selectedIntervalMs]);

  const lastRefreshedRaw = summaryQuery.dataUpdatedAt || dailyQuery.dataUpdatedAt || Date.now();
  const lastRefreshed = (() => {
    const d = new Date(lastRefreshedRaw);
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
    const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${time} on ${date}`;
  })();

  const INTERVAL_OPTIONS = [
    { label: "Every 5 min", ms: 5 * 60 * 1000 },
    { label: "Every 15 min", ms: 15 * 60 * 1000 },
    { label: "Every 1 hour", ms: 60 * 60 * 1000 },
    { label: "Every 24 hours", ms: 24 * 60 * 60 * 1000 },
  ];

  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e5e5";
  const tickColor = isDark ? "#98999C" : "#71717a";

  const dailyDataFormatted = useMemo(() => {
    if (!dailyQuery.data) return [];
    return dailyQuery.data.map(d => ({ ...d, displayDate: formatDateDisplay(d.date) }));
  }, [dailyQuery.data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const sessionsData = useMemo(() => {
    if (!recentSessionsQuery.data) return [];
    const sorted = [...recentSessionsQuery.data].sort(
      (a, b) => new Date(a.firstSeenAt).getTime() - new Date(b.firstSeenAt).getTime()
    );
    return sorted.map((s, i) => ({ ...s, visitorNum: i + 1 }));
  }, [recentSessionsQuery.data]);

  const visitorChartData = useMemo(() => {
    return sessionsData.map((s) => ({
      name: `Visitor ${s.visitorNum}`,
      minutes: parseFloat((s.duration / 60).toFixed(1)),
      pageViews: s.pageViewCount,
    }));
  }, [sessionsData]);

  const columns: ColumnDef<any>[] = [
    {
      id: "visitorNum",
      header: "Visitor",
      cell: ({ row }) => (
        <span className="text-sm font-semibold" style={{ color: CHART_COLORS.blue }}>
          #{row.original.visitorNum}
        </span>
      ),
    },
    {
      accessorKey: "firstSeenAt",
      header: "Arrived",
      cell: ({ row }) => {
        const d = new Date(row.original.firstSeenAt);
        return <span className="text-sm whitespace-nowrap">{d.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: "duration",
      header: "Time Spent",
      cell: ({ row }) => (
        <span className="text-sm font-medium">{formatTime(row.original.duration)}</span>
      ),
    },
    {
      accessorKey: "pageViewCount",
      header: "Page Views",
      cell: ({ row }) => <span className="text-sm">{row.original.pageViewCount}</span>,
    },
    {
      accessorKey: "bounced",
      header: "Status",
      cell: ({ row }) => (
        row.original.bounced ?
        <span className="px-2 py-1 rounded text-[11px] font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Bounced</span> :
        <span className="px-2 py-1 rounded text-[11px] font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Engaged</span>
      ),
    },
    {
      accessorKey: "referrer",
      header: "Referrer",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground truncate max-w-[200px] block" title={row.original.referrer || "Direct"}>
          {row.original.referrer ? "Via link" : "Direct"}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: sessionsData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="min-h-screen bg-background px-5 py-4 pt-[32px] pb-[32px] pl-[24px] pr-[24px] overflow-x-hidden" style={{ willChange: "scroll-position", WebkitOverflowScrolling: "touch" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="pt-2">
            <h1 className="font-bold text-[32px] tracking-tight">Analytics Cockpit</h1>
            <p className="text-muted-foreground mt-1.5 text-[14px]">IRP 2.0 Real-time mission control</p>
            
            {DATA_SOURCES.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[12px] text-muted-foreground shrink-0">Data Sources:</span>
                {DATA_SOURCES.map((source) => (
                  <span
                    key={source}
                    className="text-[12px] font-bold rounded px-2 py-0.5 truncate print:!bg-[rgb(229,231,235)] print:!text-[rgb(75,85,99)]"
                    title={source}
                    style={{
                      maxWidth: "20ch",
                      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgb(229, 231, 235)",
                      color: isDark ? "#c8c9cc" : "rgb(75, 85, 99)",
                    }}
                  >
                    {source}
                  </span>
                ))}
              </div>
            )}
            {lastRefreshed && <p className="text-[12px] text-muted-foreground mt-2">Last refresh: {lastRefreshed}</p>}
          </div>
          
          <div className="flex items-center gap-3 pt-2 print:hidden">
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center rounded-[6px] overflow-hidden h-[26px] text-[12px]"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2",
                  color: isDark ? "#c8c9cc" : "#4b5563",
                }}
              >
                <button onClick={handleRefresh} disabled={loading} className="flex items-center gap-1 px-2 h-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <div className="w-px h-4 shrink-0" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }} />
                <button onClick={() => setDropdownOpen((o) => !o)} className="flex items-center justify-center px-1.5 h-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg z-50 overflow-hidden py-1">
                  <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} className="rounded" />
                      <span className="text-sm font-medium">Auto-refresh</span>
                    </label>
                  </div>
                  {INTERVAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.ms}
                      onClick={() => setSelectedIntervalMs(opt.ms)}
                      disabled={!autoRefresh}
                      className="w-full px-3 py-1.5 text-left text-sm flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {opt.label}
                      {selectedIntervalMs === opt.ms && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
              aria-label="Export as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsDark((d) => !d)}
              className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    <p className="text-sm">Unique Visitors</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: CHART_COLORS.blue }}>{summaryQuery.data?.totalSessions.toLocaleString()}</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Activity className="w-4 h-4" />
                    <p className="text-sm">Total Page Views</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: CHART_COLORS.blue }}>{summaryQuery.data?.totalPageViews.toLocaleString()}</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MousePointerClick className="w-4 h-4" />
                    <p className="text-sm">Total Clicks</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: CHART_COLORS.blue }}>{summaryQuery.data?.totalClicks.toLocaleString()}</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Globe className="w-4 h-4" />
                    <p className="text-sm">Bounce Rate</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: CHART_COLORS.blue }}>{summaryQuery.data?.bounceRate.toFixed(1)}%</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">Avg Time on Page</p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: CHART_COLORS.blue }}>{formatTime(summaryQuery.data?.avgDurationSeconds || 0)}</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="px-5 pt-5 pb-3 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Daily Page Views</CardTitle>
              {!loading && dailyQuery.data && dailyQuery.data.length > 0 && (
                <CSVLink
                  data={dailyQuery.data}
                  filename="daily-page-views.csv"
                  className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
                  aria-label="Export chart data as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent className="px-2" style={{ contain: "layout style" }}>
              {loading ? (
                <div className="p-4"><Skeleton className="w-full h-[300px]" /></div>
              ) : (
                <ResponsiveContainer width="100%" height={320} debounce={50}>
                  <AreaChart data={dailyDataFormatted} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradientViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.blue} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={CHART_COLORS.blue} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} tickMargin={10} minTickGap={30} />
                    <YAxis tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v} />
                    <Tooltip content={<CustomTooltip />} isAnimationActive={false} cursor={{ fill: 'rgba(0,0,0,0.05)', stroke: 'none' }} />
                    <Area type="monotone" dataKey="views" name="Page Views" fill="url(#gradientViews)" stroke={CHART_COLORS.blue} fillOpacity={1} strokeWidth={2} activeDot={{ r: 5, fill: CHART_COLORS.blue, stroke: '#ffffff', strokeWidth: 3 }} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-5 pt-5 pb-3 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Top Clicked Elements</CardTitle>
              {!loading && topClicksQuery.data && topClicksQuery.data.length > 0 && (
                <CSVLink
                  data={topClicksQuery.data}
                  filename="top-clicks.csv"
                  className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
                  aria-label="Export chart data as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                </CSVLink>
              )}
            </CardHeader>
            <CardContent className="px-2" style={{ contain: "layout style" }}>
              {loading ? (
                <div className="p-4"><Skeleton className="w-full h-[300px]" /></div>
              ) : (
                <ResponsiveContainer width="100%" height={320} debounce={50}>
                  <BarChart data={topClicksQuery.data?.slice(0, 8)} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} />
                    <YAxis dataKey="element" type="category" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} width={120} tickFormatter={(v) => v.length > 15 ? v.substring(0, 15) + '...' : v} />
                    <Tooltip content={<CustomTooltip />} isAnimationActive={false} cursor={false} />
                    <Bar dataKey="count" name="Clicks" fill={CHART_COLORS.purple} fillOpacity={0.8} activeBar={{ fillOpacity: 1 }} isAnimationActive={false} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Time Spent per Visitor */}
        <Card className="mb-6">
          <CardHeader className="px-5 pt-5 pb-3 flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Time Spent per Visitor</CardTitle>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {loading ? "" : `${sessionsData.length} unique visitor${sessionsData.length !== 1 ? "s" : ""} total`}
              </p>
            </div>
            {!loading && visitorChartData.length > 0 && (
              <CSVLink
                data={visitorChartData}
                filename="visitor-time-spent.csv"
                className="print:hidden flex items-center justify-center w-[26px] h-[26px] rounded-[6px] transition-colors hover:opacity-80"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
                aria-label="Export as CSV"
              >
                <Download className="w-3.5 h-3.5" />
              </CSVLink>
            )}
          </CardHeader>
          <CardContent className="px-2" style={{ contain: "layout style" }}>
            {loading ? (
              <div className="p-4"><Skeleton className="w-full h-[200px]" /></div>
            ) : visitorChartData.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">No visitor data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={Math.max(120, visitorChartData.length * 52)} debounce={50}>
                <BarChart data={visitorChartData} layout="vertical" margin={{ top: 10, right: 40, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: tickColor }}
                    stroke={tickColor}
                    tickFormatter={(v) => `${v}m`}
                    label={{ value: "Minutes", position: "insideRight", offset: -4, fontSize: 11, fill: tickColor }}
                  />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} width={80} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload;
                      return (
                        <div style={{ backgroundColor: "#fff", borderRadius: "6px", padding: "10px 14px", border: "1px solid #e0e0e0", fontSize: "13px", color: "#1a1a1a" }}>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
                          <div>Time spent: <strong>{d.minutes} min</strong></div>
                          <div>Page views: <strong>{d.pageViews}</strong></div>
                        </div>
                      );
                    }}
                    isAnimationActive={false}
                    cursor={false}
                  />
                  <Bar dataKey="minutes" name="Minutes" fill={CHART_COLORS.green} fillOpacity={0.85} radius={[0, 4, 4, 0]} isAnimationActive={false}
                    label={{ position: "right", fontSize: 12, fill: tickColor, formatter: (v: number) => `${v}m` }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Sessions Table */}
        <Card>
          <CardHeader className="px-6 pt-6 pb-4 flex-row items-center justify-between space-y-0 border-b border-border/50">
            <div>
              <CardTitle className="text-base">Recent Sessions</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search sessions..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-64 h-9 print:hidden"
              />
              {!loading && recentSessionsQuery.data && recentSessionsQuery.data.length > 0 && (
                <Button variant="outline" size="sm" className="h-9 print:hidden" asChild>
                  <CSVLink data={recentSessionsQuery.data} filename="recent-sessions.csv">
                    <Download className="w-4 h-4 mr-2" /> Export
                  </CSVLink>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-3">
                <Skeleton className="h-10 w-full" />
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer select-none h-11 px-6">
                            <div className="flex items-center gap-2">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-muted/30">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-3 px-6">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                          No sessions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                {table.getFilteredRowModel().rows.length > 10 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-border/50">
                    <div className="text-sm text-muted-foreground">
                      Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                      {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{" "}
                      of {table.getFilteredRowModel().rows.length} results
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                      <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="mt-6">
          <CardHeader className="px-6 pt-6 pb-4 flex-row items-center justify-between space-y-0 border-b border-border/50">
            <div>
              <CardTitle className="text-base">Student Feedback</CardTitle>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {feedbackQuery.isLoading ? "" : `${feedbackQuery.data?.length ?? 0} response${(feedbackQuery.data?.length ?? 0) !== 1 ? "s" : ""} total`}
              </p>
            </div>
            {!feedbackQuery.isLoading && feedbackQuery.data && feedbackQuery.data.length > 0 && (
              <CSVLink
                data={feedbackQuery.data}
                filename="student-feedback.csv"
                className="print:hidden flex items-center gap-1.5 text-[12px] px-3 h-[26px] rounded-[6px] transition-colors hover:opacity-80 font-medium"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </CSVLink>
            )}
          </CardHeader>
          <CardContent className="p-0">
            {feedbackQuery.isLoading ? (
              <div className="p-6 space-y-3">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : !feedbackQuery.data || feedbackQuery.data.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                No feedback submitted yet
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {feedbackQuery.data.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-start gap-4">
                    <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
                      style={{ backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#F0F1F2", color: isDark ? "#c8c9cc" : "#4b5563" }}>
                      {item.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed">{item.message}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
