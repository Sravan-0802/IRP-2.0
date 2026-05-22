import { pgTable, text, serial, timestamp, integer, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pageViewsTable = pgTable(
  "page_views",
  {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 64 }).notNull(),
    url: text("url").notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    country: text("country"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("pv_session_idx").on(t.sessionId), index("pv_created_idx").on(t.createdAt)],
);

export const clickEventsTable = pgTable(
  "click_events",
  {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 64 }).notNull(),
    element: text("element").notNull(),
    label: text("label"),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("ce_session_idx").on(t.sessionId), index("ce_created_idx").on(t.createdAt)],
);

export const sessionsTable = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    firstSeenAt: timestamp("first_seen_at").defaultNow().notNull(),
    lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
    pageViewCount: integer("page_view_count").default(1).notNull(),
    bounced: integer("bounced").default(1).notNull(),
    duration: integer("duration").default(0).notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
  },
  (t) => [index("sess_first_seen_idx").on(t.firstSeenAt)],
);

export const insertPageViewSchema = createInsertSchema(pageViewsTable).omit({ id: true, createdAt: true }) as any;
export const insertClickEventSchema = createInsertSchema(clickEventsTable).omit({ id: true, createdAt: true }) as any;

export type InsertPageView = { sessionId: string; url: string; referrer?: string | null; userAgent?: string | null; country?: string | null };
export type InsertClickEvent = { sessionId: string; element: string; label?: string | null; url: string };
export type PageView = typeof pageViewsTable.$inferSelect;
export type ClickEvent = typeof clickEventsTable.$inferSelect;
export type Session = typeof sessionsTable.$inferSelect;
