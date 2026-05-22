import { Router } from "express";
import { db } from "@workspace/db";
import { feedbackTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

const router = Router();

router.post("/feedback", async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    if (!message || String(message).trim().length < 3) {
      return res.status(400).json({ error: "Message too short" });
    }
    const [row] = await db
      .insert(feedbackTable)
      .values({ sessionId: sessionId ?? null, message: String(message).trim() })
      .returning();
    return res.json(row);
  } catch (err) {
    return res.status(500).json({ error: "Failed to save feedback" });
  }
});

router.get("/feedback", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(feedbackTable)
      .orderBy(desc(feedbackTable.createdAt));
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

export default router;
