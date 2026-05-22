import { Router } from "express";
import { db } from "@workspace/db";
import {
  pageViewsTable,
  clickEventsTable,
  sessionsTable,
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
