import { Router } from "express";
import { db } from "@workspace/db";
import {
  pageViewsTable,
  clickEventsTable,
  sessionsTable,
  scrollEventsTable,
} from "@workspace/db/schema";
import { eq, gte, sql, count, desc } from "drizzle-orm";

const router = Router();

router.post("/analytics/pageview", async (req, res) => {
  try {
    const { sessionId, url, referrer, userAgent } = req.body;
    if (!sessionId || !url) return res.status(400).json({ error: "Missing required fields" });

    await db.insert(pageViewsTable).values({ sessionId, url, referrer, userAgent });

    const existing = await db.query.sessionsTable.findFirst({
      where: eq(sessionsTable.id, sessionId),
    });

    if (existing) {
      await db
        .update(sessionsTable)
        .set({
          lastSeenAt: new Date(),
          pageViewCount: existing.pageViewCount + 1,
          bounced: 0,
        })
        .where(eq(sessionsTable.id, sessionId));
    } else {
      await db.insert(sessionsTable).values({
        id: sessionId,
        referrer,
        userAgent,
        bounced: 1,
        pageViewCount: 1,
      });
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/analytics/click", async (req, res) => {
  try {
    const { sessionId, element, label, url } = req.body;
    if (!sessionId || !element || !url) return res.status(400).json({ error: "Missing required fields" });

    await db.insert(clickEventsTable).values({ sessionId, element, label, url });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/analytics/heartbeat", async (req, res) => {
  try {
    const { sessionId, duration } = req.body;
    if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

    await db
      .update(sessionsTable)
      .set({ lastSeenAt: new Date(), duration: duration ?? 0 })
      .where(eq(sessionsTable.id, sessionId));

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.get("/analytics/summary", async (_req, res) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalSessions] = await db
      .select({ count: count() })
      .from(sessionsTable)
      .where(gte(sessionsTable.firstSeenAt, since));

    const [bouncedSessions] = await db
      .select({ count: count() })
      .from(sessionsTable)
      .where(sql`${sessionsTable.bounced} = 1 AND ${sessionsTable.firstSeenAt} >= ${since}`);

    const [totalPageViews] = await db
      .select({ count: count() })
      .from(pageViewsTable)
      .where(gte(pageViewsTable.createdAt, since));

    const [totalClicks] = await db
      .select({ count: count() })
      .from(clickEventsTable)
      .where(gte(clickEventsTable.createdAt, since));

    const [avgDurationRow] = await db
      .select({ avg: sql<number>`avg(${sessionsTable.duration})` })
      .from(sessionsTable)
      .where(gte(sessionsTable.firstSeenAt, since));

    const topClicks = await db
      .select({
        element: clickEventsTable.element,
        label: clickEventsTable.label,
        count: count(),
      })
      .from(clickEventsTable)
      .where(gte(clickEventsTable.createdAt, since))
      .groupBy(clickEventsTable.element, clickEventsTable.label)
      .orderBy(desc(count()))
      .limit(10);

    const dailyViews = await db
      .select({
        date: sql<string>`DATE(${pageViewsTable.createdAt})`,
        views: count(),
      })
      .from(pageViewsTable)
      .where(gte(pageViewsTable.createdAt, since))
      .groupBy(sql`DATE(${pageViewsTable.createdAt})`)
      .orderBy(sql`DATE(${pageViewsTable.createdAt})`);

    const totalS = totalSessions.count ?? 0;
    const bouncedS = bouncedSessions.count ?? 0;
    const bounceRate = totalS > 0 ? Math.round((bouncedS / totalS) * 100) : 0;

    res.json({
      totalSessions: totalS,
      totalPageViews: totalPageViews.count ?? 0,
      totalClicks: totalClicks.count ?? 0,
      bounceRate,
      avgDurationSeconds: Math.round(avgDurationRow.avg ?? 0),
      topClicks,
      dailyViews,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.get("/analytics/daily", async (_req, res) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const dailyViews = await db
      .select({
        date: sql<string>`DATE(${pageViewsTable.createdAt})`,
        views: count(),
      })
      .from(pageViewsTable)
      .where(gte(pageViewsTable.createdAt, since))
      .groupBy(sql`DATE(${pageViewsTable.createdAt})`)
      .orderBy(sql`DATE(${pageViewsTable.createdAt})`);
    res.json(dailyViews);
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.get("/analytics/clicks", async (_req, res) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const topClicks = await db
      .select({
        element: clickEventsTable.element,
        label: clickEventsTable.label,
        count: count(),
      })
      .from(clickEventsTable)
      .where(gte(clickEventsTable.createdAt, since))
      .groupBy(clickEventsTable.element, clickEventsTable.label)
      .orderBy(desc(count()))
      .limit(20);
    res.json(topClicks);
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/analytics/scroll", async (req, res) => {
  try {
    const { sessionId, url, depth } = req.body;
    if (!sessionId || !url || typeof depth !== "number") {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const clamped = Math.max(0, Math.min(100, Math.round(depth)));
    await db.insert(scrollEventsTable).values({ sessionId, url, depth: clamped });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.get("/analytics/scroll", async (_req, res) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Per-session per-url max depth, then bucket those into milestones.
    const perSession = await db
      .select({
        sessionId: scrollEventsTable.sessionId,
        url: scrollEventsTable.url,
        maxDepth: sql<number>`MAX(${scrollEventsTable.depth})`,
      })
      .from(scrollEventsTable)
      .where(gte(scrollEventsTable.createdAt, since))
      .groupBy(scrollEventsTable.sessionId, scrollEventsTable.url);

    const buckets = [
      { label: "Reached 25%", min: 25, count: 0 },
      { label: "Reached 50%", min: 50, count: 0 },
      { label: "Reached 75%", min: 75, count: 0 },
      { label: "Reached 100%", min: 100, count: 0 },
    ];
    let depthSum = 0;
    for (const row of perSession) {
      const d = Number(row.maxDepth) || 0;
      depthSum += d;
      for (const b of buckets) if (d >= b.min) b.count += 1;
    }
    const totalSessions = perSession.length;
    const avgDepth = totalSessions > 0 ? Math.round(depthSum / totalSessions) : 0;

    // Per-page average depth (top pages).
    const perPage: Record<string, { sum: number; count: number }> = {};
    for (const row of perSession) {
      const key = row.url;
      if (!perPage[key]) perPage[key] = { sum: 0, count: 0 };
      perPage[key].sum += Number(row.maxDepth) || 0;
      perPage[key].count += 1;
    }
    const byPage = Object.entries(perPage)
      .map(([url, v]) => ({
        url,
        sessions: v.count,
        avgDepth: Math.round(v.sum / v.count),
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10);

    res.json({
      totalSessions,
      avgDepth,
      distribution: buckets.map((b) => ({
        bucket: b.label,
        sessions: b.count,
        pct: totalSessions > 0 ? Math.round((b.count / totalSessions) * 100) : 0,
      })),
      byPage,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.get("/analytics/sessions/recent", async (_req, res) => {
  try {
    const recent = await db
      .select()
      .from(sessionsTable)
      .orderBy(desc(sessionsTable.firstSeenAt))
      .limit(50);
    res.json(recent);
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

export default router;
