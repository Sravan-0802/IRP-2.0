# IRP 2.0 Analytics Report
**Generated:** 22 May 2026 | **Data window:** 21–22 May 2026 (last 30 days)

---

## Executive Summary

Analytics tracking went live on **21 May 2026**. All data collected so far (4 sessions, 47 page views, 1 click) comes exclusively from **Replit development/preview sessions** — not from student traffic. Every referrer URL traces back to the Replit workspace iframe or dev domain. This means the landing page has not yet been widely distributed to the ~9,000 student base.

The good news: tracking is working correctly. Session recording, page view counting, heartbeat duration logging, and CTA click capture are all firing as expected. The pipeline is ready for real traffic.

---

## What the Data Actually Shows

### Sessions (4 total)

| Session | Device | Page Views | Duration | Source |
|---|---|---|---|---|
| f5f76e9f | Windows / Chrome | 31 | 1h 15m 3s | Replit workspace iframe |
| fc60baa8 | Mac / Chrome | 6 | 5m 6s | Replit dev URL |
| 1c9bbee4 | Mac / Chrome | 6 | 5m 5s | Replit workspace iframe |
| 80246ce9 | Mac / Chrome | 4 | 2m 0s | Replit workspace iframe |

- **0% bounce rate** — every session engaged with multiple page views. This is expected for development sessions but bodes well for page stickiness once live.
- **Average time on page: 21m 49s** — heavily skewed by the 75-minute Windows session (likely someone building/reviewing the page). True student average will normalise once live traffic begins.
- **Only 1 CTA click** recorded (Register Button) across 4 sessions. This is expected at this stage — the testing focus was on content, not conversion.

### Daily Views

| Date | Views |
|---|---|
| 21 May 2026 | 43 |
| 22 May 2026 | 4 |

The spike on May 21 corresponds to the day the page went through heavy iteration (content changes, image swaps, label edits). May 22's 4 views are from a single session that opened the page in the morning.

---

## Key Finding: No Student Data Yet

**This is the most important finding.** The analytics system is operational, but the page hasn't been shared with students. All sessions originate from:
- `pike.replit.dev/__replco/workspace_iframe.html` — the Replit agent preview pane
- `pike.replit.dev/` — direct dev URL

There is zero organic or student-referred traffic in the dataset.

---

## Recommendations

### 1. Deploy before sharing the link
The published app at `.replit.app` will track students separately from dev sessions. Share the **published URL** (not the dev URL) to keep analytics clean. Dev sessions will still appear in the data — consider adding an environment flag to filter them out in future.

### 2. Watch the Register CTA conversion rate closely
The most important metric once live: **clicks on `register_cta` ÷ total sessions**. Even a 5% conversion rate on 9,000 students = 450 registrations. Monitor this daily after launch.

### 3. Set a 7-day baseline window
The first 7 days after share will establish your true baseline for bounce rate, avg duration, and CTA conversion. Don't draw conclusions from day-1 data — wait for at least 500 sessions before optimising.

### 4. Track scroll depth (future)
Currently the analytics captures page views and explicit CTA clicks, but not how far students scroll. Adding scroll milestone events (25%, 50%, 75%, 100%) would reveal whether students are reaching the L3 section or dropping off in the hero.

### 5. Watch avg duration vs bounce rate together
A high bounce rate with high duration = students read and left intentionally (good). A high bounce rate with low duration = students left quickly (page isn't landing). This pairing is the most useful health signal once real traffic flows.

---

## System Health

- **Tracking hooks**: All firing correctly (pageview, heartbeat, CTA click)
- **API endpoints**: `/analytics/summary`, `/analytics/daily`, `/analytics/clicks`, `/analytics/sessions/recent` — all returning valid JSON
- **Dashboard**: Live at `/analytics-dashboard/` with real-time refresh capability
- **Data integrity**: No missing sessions, no orphaned events

---

*Report generated from live PostgreSQL analytics tables. Data reflects 30-day window ending 22 May 2026.*
