import { useEffect, useRef, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function getSessionId(): string {
  const key = "irp_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function post(path: string, body: object) {
  fetch(`${API_BASE}/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export function useAnalytics() {
  const sessionId = useRef(getSessionId());
  const startTime = useRef(Date.now());

  useEffect(() => {
    const sid = sessionId.current;
    post("/analytics/pageview", {
      sessionId: sid,
      url: window.location.pathname,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
    });

    const heartbeatInterval = setInterval(() => {
      post("/analytics/heartbeat", {
        sessionId: sid,
        duration: Math.round((Date.now() - startTime.current) / 1000),
      });
    }, 30_000);

    // Scroll depth tracking: send the max % of the page reached so far
    // whenever the user crosses a 25 / 50 / 75 / 100 milestone.
    const sentMilestones = new Set<number>();
    let maxDepth = 0;

    const computeDepth = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const scrollable = Math.max(docHeight - viewport, 1);
      const pct = Math.min(100, Math.round(((scrollTop + viewport) / docHeight) * 100));
      if (scrollable < 100) return 100; // page fits in viewport = 100% seen
      return pct;
    };

    let rafScheduled = false;
    const onScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const depth = computeDepth();
        if (depth > maxDepth) maxDepth = depth;
        for (const milestone of [25, 50, 75, 100]) {
          if (maxDepth >= milestone && !sentMilestones.has(milestone)) {
            sentMilestones.add(milestone);
            post("/analytics/scroll", {
              sessionId: sid,
              url: window.location.pathname,
              depth: milestone,
            });
          }
        }
      });
    };

    // Capture initial state (e.g. short pages already fully visible).
    setTimeout(onScroll, 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onUnload = () => {
      if (maxDepth > 0 && !sentMilestones.has(maxDepth)) {
        post("/analytics/scroll", {
          sessionId: sid,
          url: window.location.pathname,
          depth: maxDepth,
        });
      }
    };
    window.addEventListener("beforeunload", onUnload);

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  const trackClick = useCallback((element: string, label?: string) => {
    post("/analytics/click", {
      sessionId: sessionId.current,
      element,
      label: label ?? null,
      url: window.location.pathname,
    });
  }, []);

  return { trackClick };
}
