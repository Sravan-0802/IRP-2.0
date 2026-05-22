import { useState } from "react";
import { CheckCircle2, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "irp-2-landing-page-feedback-v1";
const API_BASE = import.meta.env.VITE_API_URL ?? "";

function getSessionId(): string | null {
  try {
    return sessionStorage.getItem("irp_sid");
  } catch {
    return null;
  }
}

function hasSubmitted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "submitted";
  } catch {
    return false;
  }
}

function markSubmitted() {
  localStorage.setItem(STORAGE_KEY, "submitted");
}

export function PageFeedbackButton() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(() => hasSubmitted());
  const [thought, setThought] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (thought.trim().length < 3) {
      toast({
        title: "Type something first",
        description: "Share at least a few words.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: getSessionId(), message: thought.trim() }),
      });
    } catch {
    } finally {
      setLoading(false);
    }
    markSubmitted();
    setSubmitted(true);
    setThought("");
  };

  return (
    <div className="border-t border-black/10 bg-[#FAF7F0] py-8 px-4">
      <div className="mx-auto max-w-xl">
        {submitted ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            <p className="text-base font-bold text-black/80">Thanks for sharing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-base font-bold text-black/75">
              <MessageSquare className="h-5 w-5 text-[#1D4ED8] shrink-0" />
              Have any thoughts? Let us know here:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Type your thoughts…"
                className="flex-1 rounded-xl border-2 border-black/15 bg-white px-4 py-3 text-sm font-medium text-black placeholder:text-black/35 focus:border-[#1D4ED8]/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white hover:bg-[#1e40af] transition-colors shrink-0 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {loading ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
