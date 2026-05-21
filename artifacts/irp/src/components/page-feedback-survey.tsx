import { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "irp-2-landing-page-feedback-v1";
const ABOUT_MAX = 280;

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

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div
      className="flex items-center gap-0.5"
      role="radiogroup"
      aria-label="Rate this page from 1 to 5 stars"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n === 1 ? "" : "s"}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className="rounded-lg p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              n <= active ? "fill-amber-400 text-amber-400" : "text-black/15"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function PageFeedbackButton() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [aboutYou, setAboutYou] = useState("");

  useEffect(() => {
    setSubmitted(hasSubmitted());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      toast({
        title: "Pick a star rating",
        description: "Rate this page from 1 to 5 stars.",
        variant: "destructive",
      });
      return;
    }
    const trimmed = aboutYou.trim();
    if (trimmed.length < 8) {
      toast({
        title: "Tell us a bit about yourself",
        description: "Add at least a short line (8+ characters).",
        variant: "destructive",
      });
      return;
    }

    markSubmitted();
    setSubmitted(true);
    setRating(0);
    setAboutYou("");
  };

  const showSuccess = submitted;

  return (
    <>
      <div className="flex justify-center border-t border-black/10 bg-[#FAF7F0] py-5">
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-bold tracking-tight text-black/70 shadow-sm hover:border-black/25 hover:text-black transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5 text-[#1D4ED8]" aria-hidden />
          Share feedback
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl border-2 border-black/10 sm:rounded-2xl">
          {showSuccess ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" aria-hidden />
              <DialogHeader className="text-center sm:text-center">
                <DialogTitle className="font-display text-xl">You have submitted successfully.</DialogTitle>
              </DialogHeader>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Quick feedback</DialogTitle>
                <DialogDescription className="text-left text-sm text-black/60">
                  Two short questions about this page.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold">How do you like this page?</p>
                  <StarRatingInput value={rating} onChange={setRating} />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold">Describe yourself in a few words</p>
                  <Textarea
                    value={aboutYou}
                    onChange={(e) => setAboutYou(e.target.value.slice(0, ABOUT_MAX))}
                    placeholder="e.g. 2nd year CSE · YOG 2029"
                    rows={3}
                    className="resize-none rounded-xl border-2 border-black/10 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-black text-white font-bold py-3 text-sm hover:bg-[#1D4ED8] transition-colors"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
