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

    return () => clearInterval(heartbeatInterval);
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
