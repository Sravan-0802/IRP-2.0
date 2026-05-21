import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code,
  Database,
  Flame,
  Globe,
  Linkedin,
  Menu,
  Sparkles,
  Star,
  Trophy,
  User,
  X,
  CheckCircle2,
  Target,
  Cpu,
  GitBranch,
  Brain,
  Unlock,
  Award,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageFeedbackButton } from "@/components/page-feedback-survey";

/* =========================================================================
   DATA — preserved from the original (courses, testimonials, FAQ, checklist)
   ========================================================================= */

/* L1 assessment schedule — single source for copy across the page */
const L1_ASSESSMENT_DATE = "14th June, 2026";
const ASSESSMENT_TARGET = new Date("2026-06-14T03:30:00.000Z");
const ASSESSMENT_DATE_LABEL = "L1 Hustler Assessment on 14th June, 2026! Mark your calendars.";
const L1_ASSESSMENT_SHORT = `L1 Assessment on ${L1_ASSESSMENT_DATE}`;
const L1_ASSESSMENT_FULL = ASSESSMENT_DATE_LABEL;

const LEVELS = [
  {
    n: "01",
    code: "L1",
    label: "Level 1",
    nickname: "The Hustler",
    tagline: "Your entry point — foundational frontend and programming.",
    date: L1_ASSESSMENT_DATE,
    duration: "~2 hrs assessment",
    icon: User,
    color: "#1D4ED8",
    bg: "#E0E7FF",
    sections: [
      { label: "Problem Solving (Python / C++)", meta: "Coding · 90 Minutes · 4 questions" },
      { label: "FE — HTML, CSS, JS, React", meta: "MCQ · 30 minutes · 30 questions" },
    ],
    post: [
      "FE project · 12 hours",
      "AI mock interview (NxtMock) · 1 hour",
      "Human mock interview · 1 hour",
    ],
    unlocks: "Eligibility to appear for Level 2",
    postHeading: "Post Assessment",
  },
  {
    n: "02",
    code: "L2",
    label: "Level 2",
    nickname: "The Main Character",
    tagline: "Backend, databases & GenAI — the full‑stack layer.",
    date: "",
    duration: "~2 hrs MCQ (+ post rounds)",
    icon: Cpu,
    color: "#F59E0B",
    bg: "#FEF3C7",
    sections: [
      { label: "BE — NodeJS + Express", meta: "MCQ · 20 minutes · 20 questions" },
      { label: "Database — SQL, NoSQL, MongoDB", meta: "20 MCQs + 3 SQL Coding Questions · 80 minutes" },
      { label: "GenAI", meta: "MCQ · 20 minutes · 20 questions" },
      { label: "Combined MCQ assessment", meta: "~2 hours total · 63 questions" },
    ],
    post: [
      "Full stack + AI project · 24 hours",
      "AI mock interview · 1 hour",
      "Human mock interview · 1 hour",
    ],
    unlocks: "Internship opportunities (₹5K–₹15K) + Access to L3 Infinite Aura",
    postHeading: "Post Assessment",
  },
  {
    n: "03",
    code: "L3",
    label: "Level 3",
    nickname: "Infinite Aura",
    tagline: "Top 1% track — ₹25K+ stipends & curated mentorship.",
    date: "",
    duration: "Invite‑only cohort",
    icon: Trophy,
    color: "#F43F5E",
    bg: "#FFE4E6",
    sections: [
      { label: "DSA Levels 2, 3 & 4", meta: "Assessment" },
      { label: "Full stack Gen AI", meta: "Assessment" },
      { label: "CodeChef", meta: "Rating > 1600" },
      { label: "Human mock interview", meta: "Project + resume depth" },
    ],
    post: [
      "Internship opportunities with ₹25K+ monthly stipend",
      "Unlock mentorship from mentors of top product-based companies such as Salesforce, Google, Microsoft!",
      "Interactions with NxtWave's founding team",
    ],
    unlocks: "Only for students who complete the full IRP 2.0 path",
    sectionsHeading: "Eligibility pillars",
    postHeading: "What all L3 Offers:",
  },
] as const;

const COURSES_L1 = {
  frontend: [
    { name: "Build your own Static Website", url: "https://learning.ccbp.in/cl-course/6d41f350-76d5-4337-9be0-3fe0b26b1b26" },
    { name: "Build your own Responsive Website", url: "https://learning.ccbp.in/cl-course/62e43c70-ee74-4afe-8d1c-26ca9c22947a" },
    { name: "Modern Responsive Web Design", url: "https://learning.ccbp.in/cl-course/1d571a66-be1e-49cd-a17f-5b3b22d6d751" },
    { name: "Build your own Dynamic Web Application", url: "https://learning.ccbp.in/cl-course/c0d9b357-87a7-41e2-985f-affaef636499" },
    { name: "JS Essentials", url: "https://learning.ccbp.in/cl-course/7e0446da-981d-4faa-b02d-f4dc605dba66" },
    { name: "Getting Started with React JS", url: "https://learning.ccbp.in/cl-course/40ab5ebd-3def-4faf-adca-3d39d921df1c" },
  ],
  coding: [
    { name: "Programming Foundations", url: "https://learning.ccbp.in/cl-course/c6008f8d-cd91-4843-bb3f-b75d4beca046" },
    { name: "DSA - Level 1", url: "https://learning.ccbp.in/course?c_id=058b97cb-16db-4098-8b1e-3e7cbffe1db4" },
  ],
};

/** Level 2: two prep categories (backend stack vs GenAI), per programme design */
const COURSES_L2 = {
  backend: [
    { name: "Introduction to Databases", url: "https://learning.ccbp.in/cl-course/25c1a72c-216e-47e1-9bc6-b2f16c66e0ca" },
    { name: "DBMS", url: "https://learning.ccbp.in/course?c_id=3ba04d30-7c3a-4d5d-8c23-6e3bfc093511" },
    { name: "Node JS", url: "https://learning.ccbp.in/cl-course/d82d6905-6694-42c4-8c0c-bd2c887c1b53" },
    { name: "MongoDB", url: "https://learning.ccbp.in/course?c_id=a5777f9b-1a9c-42a5-aab7-0182e80efca2&s_id=f09a898b-f8e3-4ded-a6c7-46184629ff3d&t_id=42d9584b-aee6-4eb6-b1ed-8f8de7a29633" },
  ],
  genAi: [
    { name: "Generative AI", url: "https://learning.ccbp.in/course?c_id=b9811b34-585b-47e0-a0be-65f1081a74f2&s_id=64025833-d46d-4e7c-a7e0-a9c230a78b9d&t_id=096cf0ff-cdc5-4efb-9895-7c9aff0dbb1e" },
  ],
} as const;

const COURSES_L3 = {
  dsa: [
    { name: "DSA — Level 2", url: "https://learning.ccbp.in/course?c_id=229cbe49-f4c4-4aa2-bcc6-55ea3e15e159" },
    { name: "DSA — Level 3", url: "https://learning.ccbp.in/course?c_id=68d141a9-3a73-4bc3-8d8c-cfff7ec8a4be&s_id=696cf715-22e7-4587-ac63-6c5df7427ad5&t_id=009e5ade-f694-4a42-8dbf-544f06a4da1e" },
  ],
  practice: [
    { name: "CodeChef (aim for rating > 1600 for L3)", url: "https://www.codechef.com" },
    { name: "LeetCode (supporting practice)", url: "https://leetcode.com" },
  ],
};

const TESTIMONIALS = [
  {
    name: "Chintada Pavan Surya",
    img: "/pavan-surya.png",
    linkedin: "https://www.linkedin.com/in/pavan-surya-chintada",
    role: "AI Automation Engineer",
    company: "Scomedia · Playto · Bellcorp Studio",
    stipend: "₹10k – ₹15k",
    duration: "6 months",
    rating: 5,
    quote:
      "The placement team provided excellent support and answered doubts multiple times. Started working from Day 1, built projects, and kept my GitHub active — that made all the difference!",
  },
  {
    name: "Malaya Kumar Pradhan",
    img: "/malaya-kumar.png",
    linkedin: "https://www.linkedin.com/in/malaya-kumar-pradhan",
    role: "MERN Intern",
    company: "Chirpn IT Solutions",
    stipend: "₹5k – ₹10k",
    duration: "6 months",
    rating: 4,
    quote:
      "I improved my MERN skills and learned system design from scratch. This internship taught me that real development is about solving problems and understanding how systems work together.",
  },
  {
    name: "Abhay Soni",
    img: "/abhay-soni.png",
    linkedin: "https://www.linkedin.com/in/abhaysoni2804",
    role: "Associate Engineer",
    company: "Bellcorp Studio",
    stipend: "₹5k – ₹10k",
    duration: "6 months",
    rating: 5,
    quote:
      "Built a movie ticket booking system, worked on admin console, APIs, and MERN stack. Learned how real projects work, how teams collaborate, and how to debug and integrate APIs efficiently.",
  },
  {
    name: "Ashlesh Bathina",
    img: "/ashlesh-bathina.png",
    linkedin: "https://www.linkedin.com/in/ashleshbathina",
    role: "Software Developer Intern",
    company: "2xCabs",
    stipend: "₹5k – ₹10k",
    duration: "6 months",
    rating: 5,
    quote:
      "The process included TR1 and TR2 + HR rounds. I revised MERN fundamentals and improved my technical knowledge, confidence, and communication. This internship gave me real-world exposure and helped me grow a lot.",
  },
  {
    name: "Yelkur Pujitha",
    img: "/yelkur-pujitha.png",
    linkedin: "https://www.linkedin.com/in/yelkur-pujitha",
    role: "Associate Software Engineer",
    company: "Bellcorp Studio",
    stipend: "₹10k – ₹15k",
    duration: "6 months",
    rating: 5,
    quote:
      "Worked on authentication, API integrations, frontend-backend integration with React, MongoDB, and REST APIs. Learned professional workflows, collaboration, and how to adapt in a real-world environment.",
  },
] as const;

const CHECKLIST = [
  {
    num: "01",
    title: "Study & revise the core",
    detail: "DSA basics, HTML, CSS, JS, OOP — lock in your fundamentals.",
    accent: "#1D4ED8",
  },
  {
    num: "02",
    title: "Practice daily, no skips",
    detail: "Solve on the NxtWave platform every day. Consistency > cramming.",
    accent: "#F59E0B",
  },
  {
    num: "03",
    title: "Finish pending courses",
    detail: "Complete the relevant courses for your level before the assessment date.",
    accent: "#F43F5E",
  },
  {
    num: "04",
    title: "Build the profile",
    detail: "LinkedIn · GitHub · LeetCode · CodeChef — keep them updated and active.",
    accent: "#10B981",
  },
] as const;

const FAQ = [
  {
    id: "eligibility",
    title: "Eligibility & Who Can Participate",
    questions: [
      { q: "Is IRP 2.0 for all students or only 1st and 2nd year students?", a: "IRP 2.0 is exclusively for YOG 2028 and YOG 2029 students — that's 1st and 2nd year students. If you recently completed your 2nd year, you are still eligible. If you are from an earlier batch, please connect with our Help Section for the appropriate process." },
      { q: "I just completed my 2nd year. Am I eligible?", a: "Yes. YOG 2028 students who have just completed their 2nd year are eligible to participate in IRP 2.0." },
      { q: "Are Smart Program students eligible?", a: "If you are a YOG 2028 or 2029 student under the Smart Program, please connect with our Help Section — eligibility is determined by YOG, not program type." },
      { q: "What is the minimum course completion required to be eligible?", a: "There is no fixed percentage threshold for eligibility to register. However, you are expected to have completed the courses relevant to the level you are appearing for before the assessment date." },
    ],
  },
  {
    id: "assessment",
    title: "Assessment Process & Structure",
    questions: [
      { q: "Does clearing Level 1 make me eligible for internship opportunities?", a: "No. Clearing Level 1 alone does not make you eligible for internships. Internship opportunities unlock only after you clear both Level 1 and Level 2. Once you clear both, you become eligible for standard opportunities (₹5K–₹15K stipend range). If you are aiming for ₹25K+ stipend internships, you will additionally need to qualify for Level 3 — the Infinite Aura track." },
      { q: "What happens if I clear Level 1 but fail Level 2?", a: "You will not be eligible for internship opportunities until you clear Level 2 as well. Details on retake windows will be communicated separately. Reattempt for Level 2 and its timeline will be communicated whenever Level 2 reattempt happens." },
      { q: "Will the assessment on 14th June be online?", a: "Yes, the 14th June assessment (Level 1) is fully online." },
      { q: "Is there a deadline to complete all three levels?", a: "Specific deadlines will be communicated at each stage." },
      { q: "Will there be a second attempt if I miss or fail the June 14th assessment?", a: "Details on retake opportunities will be shared after Summer Batch 1. We will inform on the upcoming batch details soon thereafter. Watch your registered email for updates." },
    ],
  },
  {
    id: "skills",
    title: "Skills & Preparation",
    questions: [
      { q: "What skills do I need for Level 1?", a: "Level 1 covers foundational programming and frontend: a Problem Solving round (Python or C++ — 4 questions, 1.5 hours) plus an FE MCQ section (HTML, CSS, JS, React — 30 questions, 30 minutes), followed by a Topin project build and AI + Human mock interviews. Use the Level 1 course list above to map your prep." },
      { q: "Is DSA Level 1 enough for the Level 1 problem-solving round?", a: "Yes — that round is calibrated to foundational problem solving. Completing Programming Foundations plus DSA Level 1 on NxtWave is the recommended baseline before attempting the Level 1 assessment." },
      { q: "Should I learn Python or C++ for the Level 1 problem-solving round?", a: "Either language is acceptable for the Problem Solving section. Pick the language you can write fastest and debug confidently, and align preparation with Programming Foundations plus DSA Level 1 on NxtWave." },
      { q: "Is GenAI mandatory for Level 2?", a: "Yes. Level 2 includes GenAI MCQs together with Backend (NodeJS + Express) and Database (SQL/NoSQL/MongoDB, including SQL coding questions). You will also apply GenAI inside the 24-hour Full Stack + AI project submission." },
      { q: "Is HTML, CSS, and JavaScript enough for Level 1, or do I need more?", a: "For Level 1, you need HTML, CSS, JavaScript Essentials, and React — all covered in the NxtWave curriculum. That is the scope of the FE MCQ section." },
      { q: "Should I learn skills in parallel or one at a time?", a: "Complete courses in the order prescribed in your NxtWave learning path. For Level 1 preparation, prioritize completing the FE courses and DSA Level 1 first." },
      { q: "Does communication matter in the interview?", a: "Yes. The Human Mock Interview evaluates not just your technical output but also how well you can explain your project and reasoning. Basic clear communication in English is important." },
      { q: "What if my English communication is not strong?", a: "The Mock Interviews will assess you based on your project and problem-solving ability. Focus on explaining your thought process clearly — fluency is not the primary criteria." },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    questions: [
      { q: "Will there be a real project in IRP 2.0?", a: "Yes. Both levels involve a project submission: a Frontend Project in Level 1 (12 hours) and a Full Stack + AI Project in Level 2 (24 hours)." },
      { q: "Do I actually get valuable experience through internships or is it just for certificates?", a: "NxtWave internship opportunities involve real project work at partner companies. You will gain hands-on experience with actual development tasks — not just certificates. Past students have worked on real products and received stipends." },
      { q: "Are remote internships valuable — or will I miss out by not working in-person?", a: "Remote internships through NxtWave involve real deliverables and mentorship. The experience is comparable to in-person internships in terms of learning. You will work on actual company projects." },
    ],
  },
  {
    id: "stipend",
    title: "Stipend & Internship Opportunities",
    questions: [
      { q: "Are the internships paid?", a: "Yes. Level 2 clearance gives access to internships in the ₹5K–₹15K/month stipend range. Level 3 (Infinite Aura track) gives access to ₹25K+ stipend opportunities." },
      { q: "If I clear both Level 1 and Level 2, what stipend can I expect?", a: "Stipends vary by company and role. After clearing both levels, you become eligible for opportunities typically in the ₹5K–₹10K/month range. Top performers who reach Level 3 status can access ₹25K+ opportunities." },
      { q: "Are there internships for specific domains like Data Analytics, AI/ML, or Cybersecurity?", a: "IRP 2.0 is focused on Full Stack and Frontend development opportunities. Internships in specific domains like Data Analytics or AI/ML may be available through separate channels." },
      { q: "How long are the internships?", a: "Internship duration varies by company and role. Typical duration is 3–6 months. Specific details will be shared when opportunities are released." },
      { q: "Will internships be remote or in-office?", a: "Both options may be available depending on the company. Most opportunities in the current batch are remote or hybrid." },
      { q: "How many hours per day is expected during an internship?", a: "This varies by company. Most internships under IRP have structured working hours similar to a full-time engagement (5–6 days a week; 9 hours a day). Hence getting an NOC from your college authorities is mandatory." },
    ],
  },
  {
    id: "noc",
    title: "NOC",
    questions: [
      { q: "What is an NOC, why is it required, and how does it work in the IRP 2.0 process?", a: "A No Objection Certificate (NOC) is an official letter from your college confirming they have no objection to you pursuing an internship while enrolled as a student. IRP 2.0 internship opportunities are full-time commitments — 5 to 6 days a week, up to 9 hours a day. Companies require this letter to confirm your college is aware and has no objections. Without it, you cannot accept any internship opportunity even after clearing the assessments. You do not need the NOC to appear for the assessments." },
    ],
  },
  {
    id: "courses",
    title: "Courses & Platform",
    questions: [
      { q: "Where do I find the courses I need to study?", a: "All courses are available in your NxtWave Learning Portal. The course names mapped to Level 1 and Level 2 are listed in the \"Courses to Prepare\" section above." },
      { q: "Will a preparation roadmap be provided?", a: "What to study and prepare are already outlined here in the page. Additionally we will be holding IRP 2.0 Guidance meets on our Learning Portal!" },
      { q: "Does completing IRP contribute to Growth Cycle progress?", a: "IRP assessments and Growth Cycles are separate tracks. Completing courses in your Growth Cycle is important for IRP preparation, but IRP completion itself does not directly increment Growth Cycle progress." },
      { q: "Can I use VS Code or other tools for the project rounds?", a: "Yes. You can use your preferred IDE (VS Code, etc.) for the project rounds. The submission format will be specified when the project brief is shared." },
    ],
  },
] as const;

const REGISTER_URL = "https://forms.ccbp.in/form/irp-2-online-registration";

/** Academy internship proof — rounded for marketing; see footnotes on page for methodology */
const ACADEMY_INTERNSHIP_STATS = {
  /** All-source: NxtWave partners + students who accepted external offers while in Academy */
  allSource: {
    companies: 160,
    students: 1300,
  },
  /** NxtWave-driven only (offer accepted) — shown as secondary footnote */
  nxtwaveDriven: {
    companies: 350,
    students: 600,
  },
} as const;

/* =========================================================================
   REUSABLE PIECES
   ========================================================================= */

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[55] hidden md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.18),_transparent_60%)] blur-2xl" />
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[70] bg-gradient-to-r from-blue-500 via-amber-500 via-rose-500 to-sky-400"
    />
  );
}

function GlowOrb({
  className,
  color = "violet",
}: {
  className?: string;
  color?: "violet" | "pink" | "cyan" | "lime" | "orange";
}) {
  const map: Record<string, string> = {
    violet: "from-blue-400/60 to-blue-200/0",
    pink: "from-amber-400/55 to-amber-200/0",
    cyan: "from-sky-300/55 to-sky-100/0",
    lime: "from-emerald-300/60 to-emerald-100/0",
    orange: "from-rose-300/55 to-rose-100/0",
  };
  return (
    <div
      aria-hidden
      className={`absolute rounded-full blur-3xl bg-gradient-radial bg-gradient-to-br ${map[color]} animate-gz-blob pointer-events-none ${className ?? ""}`}
    />
  );
}

function Sticker({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "violet" | "pink" | "lime" | "cyan" | "dark";
}) {
  const tones: Record<string, string> = {
    default: "bg-white text-black",
    violet: "bg-blue-100 text-blue-900 border-blue-200",
    pink: "bg-amber-100 text-amber-900 border-amber-200",
    lime: "bg-emerald-100 text-emerald-900 border-emerald-200",
    cyan: "bg-sky-100 text-sky-900 border-sky-200",
    dark: "bg-black text-emerald-300 border-black",
  };
  return <span className={`gz-sticker ${tones[tone]} ${className ?? ""}`}>{children}</span>;
}

function SectionLabel({ children, accent = "#1D4ED8" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono-ui text-[11px] tracking-[0.22em] uppercase font-semibold">
      <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
      <span style={{ color: accent }}>{children}</span>
    </div>
  );
}

function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2;
    const my = e.clientY - r.top - r.height / 2;
    x.set(mx * 0.22);
    y.set(my * 0.22);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const palette: Record<string, string> = {
    primary:
      "bg-[#1D4ED8] text-white border-[#1D4ED8] hover:bg-[#1e40af] hover:border-[#1e40af]",
    dark: "bg-black text-white border-black",
    ghost:
      "bg-white text-black border-black/15 hover:border-black/40",
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold tracking-tight transition-colors duration-200 ${palette[variant]} ${className ?? ""}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return <button onClick={onClick} className="inline-block">{inner}</button>;
}

function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  accent = "#1D4ED8",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  const fmt = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString();
  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-display text-5xl md:text-7xl font-bold leading-none tracking-tight" style={{ color: accent }}>
        {prefix}
        {fmt}
        {suffix}
      </div>
      <div className="mt-3 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-black/55">{label}</div>
    </div>
  );
}

function Marquee({
  items,
  reverse = false,
  className,
  itemClassName,
}: {
  items: React.ReactNode[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      <div className={`flex w-max ${reverse ? "animate-gz-marquee-reverse" : "animate-gz-marquee"}`}>
        {loop.map((it, i) => (
          <div key={i} className={`flex items-center gap-6 px-6 shrink-0 ${itemClassName ?? ""}`}>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
};

function getAssessmentTimeLeft(target: Date = ASSESSMENT_TARGET): CountdownState {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    hasStarted: false,
  };
}

function useAssessmentCountdown(target: Date = ASSESSMENT_TARGET): CountdownState {
  const [time, setTime] = useState<CountdownState>(() => getAssessmentTimeLeft(target));

  useEffect(() => {
    setTime(getAssessmentTimeLeft(target));
    const id = window.setInterval(() => setTime(getAssessmentTimeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return time;
}

function L1AssessmentDateBadge({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light" | "amber";
}) {
  const label = L1_ASSESSMENT_DATE;
  const toneClass = {
    dark: "border-amber-300/35 bg-amber-400/10 text-amber-200",
    light: "border-blue-200 bg-blue-50 text-blue-800",
    amber: "border-amber-500/40 bg-amber-500/15 text-amber-950",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono-ui text-[10px] font-black uppercase tracking-widest ${toneClass} ${className}`}
    >
      <Flame className="h-3 w-3 shrink-0 opacity-90" aria-hidden />
      L1 · {label}
    </span>
  );
}

const COUNTDOWN_UNIT_STYLES = [
  { box: "border-blue-400/50 bg-blue-500/20 text-blue-50", label: "text-blue-300" },
  { box: "border-amber-400/55 bg-amber-500/25 text-amber-50", label: "text-amber-300" },
  { box: "border-emerald-400/50 bg-emerald-500/20 text-emerald-50", label: "text-emerald-300" },
  { box: "border-rose-400/50 bg-rose-500/20 text-rose-50", label: "text-rose-300" },
] as const;

function CountdownUnit({
  value,
  label,
  pad,
  styleIndex,
}: {
  value: number;
  label: string;
  pad: (n: number) => string;
  styleIndex: number;
}) {
  const style = COUNTDOWN_UNIT_STYLES[styleIndex % COUNTDOWN_UNIT_STYLES.length];
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-[3.25rem] w-[3.25rem] sm:h-14 sm:w-14 items-center justify-center rounded-lg border font-display text-xl sm:text-2xl font-bold tabular-nums shadow-sm ${style.box}`}
      >
        {pad(value)}
      </div>
      <span className={`font-mono-ui text-[9px] font-bold uppercase tracking-widest ${style.label}`}>{label}</span>
    </div>
  );
}

function AssessmentCountdownCard() {
  const { days, hasStarted } = useAssessmentCountdown();

  const size = 148;
  const strokeWidth = 9;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const maxDays = 30;
  const progress = hasStarted ? 1 : Math.min(days / maxDays, 1);
  const dash = circ * progress;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.85 }}
      role="timer"
      aria-live="polite"
      aria-label={hasStarted ? "L1 Assessment is live" : `Starts in ${days} days`}
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Track ring */}
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Amber progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>

      {/* Dark background disc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ margin: strokeWidth + 2, background: "#0B1628" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
        <span className="font-mono-ui text-[11px] font-semibold uppercase tracking-widest text-white/60">
          {hasStarted ? "Live now" : "Starts in"}
        </span>
        <span className="font-display text-5xl font-bold leading-none text-amber-400 tabular-nums">
          {hasStarted ? "🔥" : days}
        </span>
        <span className="font-mono-ui text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/80">
          {hasStarted ? "L1 open" : "DAYS"}
        </span>
      </div>
    </motion.div>
  );
}

const MENTOR_BRANDS = [
  "Microsoft",
  "Swiggy",
  "Google",
  "Amazon",
  "Salesforce",
  "Flipkart",
  "Meta",
  "Netflix",
  "Adobe",
];

function MentorBrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [marqueeDelay, setMarqueeDelay] = useState("-14s");

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const syncCenter = () => {
      const salesforce = track.querySelector<HTMLElement>('[data-brand="Salesforce"]');
      if (!salesforce) return;

      const focusCenter = salesforce.offsetLeft + salesforce.offsetWidth / 2;
      const containerCenter = container.offsetWidth / 2;
      const loopWidth = track.scrollWidth / 2;
      if (!loopWidth) return;

      const duration = 28;
      const delaySec = -(((focusCenter - containerCenter) / loopWidth) * duration);
      setMarqueeDelay(`${delaySec}s`);
    };

    syncCenter();
    window.addEventListener("resize", syncCenter);
    return () => window.removeEventListener("resize", syncCenter);
  }, []);

  const brands = useMemo(() => [...MENTOR_BRANDS, ...MENTOR_BRANDS], []);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 flex items-center overflow-hidden w-full min-h-[3.5rem] md:min-h-[4rem] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center"
        style={{ animation: `gz-marquee 28s linear infinite ${marqueeDelay}` }}
      >
        {brands.map((c, i) => (
          <span
            key={`${c}-${i}`}
            {...(i < MENTOR_BRANDS.length ? { "data-brand": c } : {})}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap text-black/85 px-6"
          >
            {c} ✦
          </span>
        ))}
      </div>
    </div>
  );
}

function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sRy = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * intensity);
    rx.set(-py * intensity);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sRx, rotateY: sRy, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   CITY SKYLINE — corporate towers (IIT-style navy + saffron windows)
   ========================================================================= */

type SkylineBuilding = {
  x: number;
  w: number;
  h: number;
  windows: { x: number; y: number; cycle: boolean }[];
  antenna?: boolean;
  /** Optional rooftop "company sign" — drawn faintly so it reads as background art */
  brand?: string;
};

/** Curated list of tenants for the corporate skyline — order = priority on tallest towers */
const SKYLINE_BRANDS: readonly string[] = [];

function generateSkylineBuildings(seed = 1): SkylineBuilding[] {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: SkylineBuilding[] = [];
  let x = 0;
  while (x < 1500) {
    const w = 58 + Math.floor(rnd() * 72);
    const h = 105 + Math.floor(rnd() * 185);
    const cols = Math.max(2, Math.floor((w - 16) / 14));
    const rows = Math.max(3, Math.floor((h - 20) / 18));
    const windows: SkylineBuilding["windows"] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rnd() > 0.34) {
          windows.push({
            x: 8 + c * 14,
            y: 14 + r * 18,
            cycle: rnd() > 0.82,
          });
        }
      }
    }
    out.push({ x, w, h, windows, antenna: rnd() > 0.58 });
    x += w + 2 + Math.floor(rnd() * 7);
  }
  return out;
}

/** Tag the N tallest, sufficiently-wide buildings with brand "roof signs". */
function assignBrandsToTallest(buildings: SkylineBuilding[], brands: readonly string[]): SkylineBuilding[] {
  const candidates = buildings
    .map((b, i) => ({ i, w: b.w, h: b.h }))
    .filter((c) => c.w >= 78)
    .sort((a, b) => b.h - a.h);
  const tagged = new Set<number>();
  const next = buildings.map((b) => ({ ...b }));
  for (let k = 0; k < Math.min(brands.length, candidates.length); k++) {
    const idx = candidates[k].i;
    if (tagged.has(idx)) continue;
    next[idx].brand = brands[k];
    tagged.add(idx);
  }
  return next;
}

function CitySkyline() {
  const back = useMemo(() => generateSkylineBuildings(19), []);
  const front = useMemo(
    () => assignBrandsToTallest(generateSkylineBuildings(81), SKYLINE_BRANDS),
    [],
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[min(400px,44vh)] overflow-hidden pointer-events-none select-none">
      <div
        className="absolute bottom-0 left-0 right-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(15,38,71,0.35)_50%,rgba(245,158,11,0.08)_85%,transparent)]"
        aria-hidden
      />
      <svg viewBox="0 0 1500 300" preserveAspectRatio="xMidYMax meet" className="absolute bottom-0 left-0 w-[112%] h-[52%] opacity-[0.42]">
        {back.map((b, i) => (
          <g key={`sb-${i}`} transform={`translate(${b.x}, ${300 - b.h})`}>
            <rect width={b.w} height={b.h} fill="#0B1628" stroke="rgba(245,158,11,0.14)" strokeWidth={0.6} />
            {b.windows.map((w, j) => (
              <rect
                key={j}
                x={w.x}
                y={w.y}
                width={4}
                height={4}
                fill="#64748B"
                opacity={0.55}
                className={w.cycle ? "gz-window-cycle" : "gz-window"}
                style={{ animationDelay: `${(i + j) * 0.065}s` }}
              />
            ))}
          </g>
        ))}
      </svg>
      <svg viewBox="0 0 1500 320" preserveAspectRatio="xMidYMax meet" className="absolute bottom-0 left-0 w-full h-[62%]">
        <defs>
          <linearGradient id="iit-bldg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1629" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#122A4A" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="iit-roofsign" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(251,191,36,0)" />
            <stop offset="35%" stopColor="rgba(251,191,36,0.55)" />
            <stop offset="65%" stopColor="rgba(251,191,36,0.55)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </linearGradient>
        </defs>
        {front.map((b, i) => {
          const charW = Math.max(4.6, Math.min(7.2, (b.w - 14) / Math.max(b.brand?.length ?? 1, 1)));
          const fontPx = Math.max(7, Math.min(11, charW * 1.35));
          return (
            <g key={`sf-${i}`} transform={`translate(${b.x}, ${320 - b.h})`}>
              {b.antenna && (
                <>
                  <rect x={b.w / 2 - 1} y={-20} width={2} height={20} fill="#334155" />
                  <circle cx={b.w / 2} cy={-22} r={2.2} fill="#F59E0B" className="animate-gz-blink" />
                </>
              )}
              <rect width={b.w} height={b.h} fill="url(#iit-bldg)" stroke="rgba(226,232,240,0.12)" strokeWidth={0.7} />

              {/* Faint corporate "roof sign" on the tallest towers */}
              {b.brand && (
                <g opacity={0.78}>
                  <rect x={3} y={6} width={b.w - 6} height={fontPx + 6} rx={1.5} fill="rgba(8,16,32,0.55)" />
                  <rect x={3} y={6 + fontPx + 4} width={b.w - 6} height={0.9} fill="url(#iit-roofsign)" />
                  <text
                    x={b.w / 2}
                    y={6 + fontPx - 1}
                    textAnchor="middle"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight={700}
                    fontSize={fontPx}
                    letterSpacing={charW * 0.18}
                    fill="#FDE68A"
                  >
                    {b.brand}
                  </text>
                </g>
              )}

              {b.windows.map((w, j) => {
                const colors = ["#FBBF24", "#F59E0B", "#FDE68A", "#E2E8F0", "#93C5FD"];
                const fill = colors[(i + j) % colors.length];
                // Skip windows that would overlap the roof sign band
                if (b.brand && w.y < 6 + fontPx + 8) return null;
                return (
                  <rect
                    key={j}
                    x={w.x}
                    y={w.y}
                    width={5}
                    height={6}
                    fill={fill}
                    opacity={0.88}
                    className={w.cycle ? "gz-window-cycle" : "gz-window"}
                    style={{ animationDelay: `${(i * 0.11 + j * 0.12) % 6}s` }}
                  />
                );
              })}
            </g>
          );
        })}
        <line x1="0" y1="320" x2="1500" y2="320" stroke="rgba(245,158,11,0.35)" strokeWidth="0.6" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent" />
    </div>
  );
}

function HeroComet({ delay = 0, top = "12%" }: { delay?: number; top?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 w-36 h-px gz-comet z-[2]"
      style={{
        top,
        animationDelay: `${delay}s`,
        background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.95), rgba(29,78,216,0.5), transparent)",
        boxShadow: "0 0 14px 1px rgba(251,191,36,0.35)",
      }}
    />
  );
}

/* =========================================================================
   NAVIGATION
   ========================================================================= */

function NavBar({ onCta }: { onCta: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items: { id: string; label: string }[] = [
    { id: "vibe", label: "Why IRP" },
    { id: "levels", label: "Levels" },
    { id: "courses", label: "Courses" },
    { id: "stories", label: "Stories" },
    { id: "faq", label: "FAQ" },
  ];
  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="sticky top-3 z-50 px-3 md:px-6">
      <nav className="mx-auto max-w-6xl rounded-full px-3 md:px-4 py-2 flex items-center justify-between bg-white/90 backdrop-blur-xl border border-black/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.18)]">
        <button onClick={() => go("hero")} className="flex items-center gap-2 pl-1">
          <img src="/nxtwave-academy-logo.png" alt="NxtWave Academy" className="h-8 w-auto" />
        </button>
        <ul className="hidden md:flex items-center gap-1 font-mono-ui text-[11px] uppercase tracking-[0.18em] font-semibold">
          {items.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => go(it.id)}
                className="px-3 py-2 rounded-full text-black/70 hover:text-black hover:bg-black/5 transition-colors"
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={onCta}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-black text-white px-4 py-2 text-xs font-bold tracking-tight hover:bg-blue-600 transition-colors"
          >
            Register <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-2 mx-auto max-w-6xl gz-glass rounded-2xl p-3 flex flex-col"
          >
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                className="text-left py-3 px-2 text-sm font-semibold border-b border-black/5 last:border-0"
              >
                {it.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onCta();
              }}
              className="mt-2 rounded-full bg-black text-white text-sm font-bold py-3"
            >
              Register · L1 on {L1_ASSESSMENT_DATE} →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =========================================================================
   HERO
   ========================================================================= */

function Hero({ onCta }: { onCta: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  const words = ["Lock", "In.", "Level", "Up.", "Get", "Paid."];

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden gz-grain bg-[#FAF7F0]">
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-[#7C3AED] via-[#F59E0B] to-[#F43F5E]" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 z-0 h-[78%] min-h-[520px] md:min-h-[600px] bg-gradient-to-br from-[#0F0B2E] via-[#1E1B5E] via-40% to-[#3B1B5E] to-90%"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 z-0 h-[78%] min-h-[520px] md:min-h-[600px] bg-gradient-to-b from-transparent via-transparent to-[#FAF7F0]"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 z-[1] h-[min(54vh,540px)] gz-hero-iit-grid" aria-hidden />

      <motion.div style={{ y: yBlob1 }} className="absolute inset-0 z-[1] opacity-[0.85]">
        <GlowOrb className="w-[520px] h-[520px] -top-28 -left-28" color="violet" />
        <GlowOrb className="w-[400px] h-[400px] top-1/4 -right-24" color="pink" />
      </motion.div>
      <motion.div style={{ y: yBlob2 }} className="absolute inset-0 z-[1] opacity-70">
        <GlowOrb className="w-[360px] h-[360px] bottom-8 left-1/4" color="cyan" />
        <GlowOrb className="w-[300px] h-[300px] -bottom-16 right-1/4" color="orange" />
      </motion.div>

      <HeroComet delay={0} top="15%" />
      <HeroComet delay={6} top="26%" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]">
        <CitySkyline />
      </div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 container mx-auto max-w-6xl px-5 md:px-8 pt-8 md:pt-14 pb-[min(210px,23vh)]"
      >
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.25rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              <motion.span
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
                }}
                className="inline-block"
              >
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
                    }}
                    className="inline-block mr-3"
                  >
                    {w}
                  </motion.span>
                ))}
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="gz-gradient-text font-serif-display italic text-[clamp(2rem,4.5vw,3.25rem)]"
              >
                your first stipend era.
              </motion.span>
            </h1>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-5 flex flex-col gap-2"
            >
              {[
                "Real assessments",
                "Real projects",
                "Stipends from ₹5K to ₹25K+",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm md:text-base text-white/85 font-medium">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="relative z-20 mt-8 flex flex-col items-start gap-4"
            >
              <MagneticButton onClick={onCta} variant="primary">
                Register for IRP 2.0
              </MagneticButton>
              <button
                type="button"
                onClick={() => document.getElementById("levels")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0B1D3A]/80 border border-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#0B1D3A] hover:border-white/20 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
              >
                <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                View the pathway
              </button>
            </motion.div>

          </div>

          {/* Right preview card stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full lg:w-[420px] shrink-0"
          >
            <TiltCard className="relative">
              <div className="relative rounded-3xl border border-white/10 bg-white/95 shadow-[0_30px_70px_-28px_rgba(5,13,26,0.55)] backdrop-blur-md p-6 ring-1 ring-black/5">
                <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3 text-[10px] font-mono-ui uppercase tracking-[0.22em] text-black/45">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    New IRP 2.0 PATH
                  </span>
                </div>
                <div className="space-y-3">
                  {LEVELS.map((lv, i) => (
                    <motion.div
                      key={lv.code}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                      className="flex items-center gap-3 rounded-2xl border border-black/[0.06] p-3 transition-colors hover:border-black/15 cursor-pointer"
                      style={{ background: lv.bg }}
                      onClick={() => {
                        const el = document.getElementById(`level-${lv.code.toLowerCase()}`);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                        style={{ background: lv.color }}
                      >
                        {lv.code}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold leading-tight">{lv.nickname}</div>
                        {lv.date && (
                          <div className="mt-0.5 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-black/45">
                            {lv.code === "L1" ? L1_ASSESSMENT_SHORT : lv.date}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-40" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

/* =========================================================================
   TICKER STRIP
   ========================================================================= */

function TickerStrip() {
  const items = [
    "✦ LOCK IN FR",
    "★ SUMMER 2026 BATCH",
    "✦ REAL STIPENDS ₹5K–₹25K+",
    "★ YOG 2028 & 2029 ONLY",
    `✦ L1 ASSESSMENT · ${L1_ASSESSMENT_DATE.toUpperCase()}`,
    "★ BUILD. SHIP. STIPEND.",
    "✦ NO CAP. JUST CODE.",
  ];
  return (
    <div className="relative bg-black text-white border-y border-black overflow-hidden">
      <Marquee
        items={items.map((t, i) => (
          <span key={i} className="font-display text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
            {t}
          </span>
        ))}
        className="py-5"
      />
    </div>
  );
}

/* =========================================================================
   STATS BAR
   ========================================================================= */

function StatsBar() {
  return (
    <section className="relative gz-bg-cream py-20 md:py-28 overflow-hidden">
      <GlowOrb className="w-[420px] h-[420px] -top-32 left-1/3" color="lime" />
      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
            The path is engineered.
            <br />
            <span className="font-serif-display italic gz-gradient-text">The stipends are real.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <StatCounter value={3} label="levels / one path" accent="#1D4ED8" />
          <StatCounter value={25} prefix="₹" suffix="K+" label="top monthly stipend" accent="#F59E0B" />
          <StatCounter
            value={ACADEMY_INTERNSHIP_STATS.allSource.companies}
            suffix="+"
            label="companies"
            accent="#F43F5E"
          />
          <StatCounter
            value={ACADEMY_INTERNSHIP_STATS.nxtwaveDriven.students}
            suffix="+"
            label="students interned"
            accent="#10B981"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   WHY IRP — BENTO GRID
   ========================================================================= */

function WhyBento({ onCta }: { onCta: () => void }) {
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
  };
  return (
    <section id="vibe" className="relative py-20 md:py-28 bg-white">
      <div className="absolute inset-0 gz-dotgrid opacity-40" aria-hidden />
      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            Other "internships" give certificates.
            <br />
            <span className="font-serif-display italic gz-gradient-text">Here, you get a paycheck.</span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-12 gap-4 md:gap-5"
        >
          {/* Card 1 — large */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-7 row-span-2 relative rounded-3xl bg-black text-white p-8 md:p-10 overflow-hidden gz-magnet"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 to-amber-500 opacity-50 blur-3xl animate-gz-blob" />
            <div className="flex items-center gap-2 mb-6">
              <span className="gz-tag bg-emerald-300 text-black">// proof</span>
              <span className="gz-tag bg-white/10 text-white/70">real students</span>
            </div>
            <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              Past students earned
              <br />
              <span className="gz-gradient-text">₹5K – ₹35K / month</span>
              <br />
              shipping real code.
            </h3>
            <p className="mt-5 text-white/65 text-base max-w-md">
              Real builds, real stipends, not shadowing.
            </p>
            <button
              onClick={() => document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white text-black text-sm font-bold hover:bg-emerald-300 transition-colors"
            >
              See the stories <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-5 relative rounded-3xl bg-blue-100 p-6 md:p-7 overflow-hidden gz-magnet"
          >
            <Brain className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
              AI is in the curriculum.
              <br />
              Not bolted on.
            </h3>
            <p className="mt-3 text-sm text-blue-900/70 leading-relaxed">
              Level 2 pairs Backend + Database MCQs (with SQL coding) alongside a GenAI section — then you prove it end-to-end in the 24-hour Full Stack + AI build.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={item}
            className="col-span-6 md:col-span-3 relative rounded-3xl bg-amber-100 p-6 overflow-hidden gz-magnet"
          >
            <Trophy className="h-7 w-7 text-amber-700 mb-3" />
            <div className="font-display text-3xl md:text-4xl font-bold tracking-tight">Top 1%</div>
            <p className="mt-1 text-sm text-amber-900/70">Unlock mentorship from mentors of top product-based companies such as Salesforce, Google, Microsoft!</p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={item}
            className="col-span-6 md:col-span-2 relative rounded-3xl bg-sky-100 p-6 overflow-hidden gz-magnet"
          >
            <Target className="h-7 w-7 text-sky-700 mb-3" />
            <div className="font-display text-2xl md:text-3xl font-bold leading-tight">YOG&nbsp;28<br />YOG&nbsp;29</div>
            <p className="mt-1 text-xs text-sky-900/70 font-mono-ui uppercase tracking-wider">only</p>
          </motion.div>

          {/* Card 5 — wide marquee */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-7 relative rounded-3xl bg-emerald-200 p-6 md:p-7 overflow-hidden gz-magnet flex flex-col"
          >
            <div className="flex items-center gap-2 shrink-0">
              <Award className="h-6 w-6 text-black" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.2em] font-bold">Elite Mentors for L3 Cleared Cohort</span>
            </div>
            <MentorBrandMarquee />
          </motion.div>

          {/* Card 6 — quote */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-5 relative rounded-3xl bg-rose-100 p-6 md:p-7 overflow-hidden gz-magnet flex flex-col justify-center"
          >
            <div className="text-7xl leading-none font-serif-display text-rose-700/40 select-none">"</div>
            <p className="-mt-6 font-serif-display italic text-xl md:text-2xl leading-snug text-rose-900">
              Started working from Day 1. Built projects, kept my GitHub active — that made all the difference.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono-ui text-rose-900/70 uppercase tracking-wider">
              <span className="w-6 h-px bg-rose-700/50" /> Pavan Surya · AI Automation Engineer
            </div>
          </motion.div>

          {/* CTA strip */}
          <motion.div variants={item} className="col-span-12 mt-2">
            <div className="relative rounded-3xl bg-black text-white p-7 md:p-9 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <GlowOrb className="w-72 h-72 -top-20 left-1/4" color="pink" />
                <GlowOrb className="w-72 h-72 -bottom-20 right-1/4" color="cyan" />
              </div>
              <div className="relative">
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                  Locked in? <span className="gz-gradient-text">Slot in for IRP 2.0.</span>
                </h3>
                <p className="mt-2 text-sm text-white/65 max-w-md">
                  Level 1 assessment · <span className="font-bold text-amber-200">{L1_ASSESSMENT_DATE}</span> — register
                  to secure your slot.
                </p>
              </div>
              <div className="relative">
                <MagneticButton onClick={onCta} variant="ghost" className="!bg-emerald-300 !text-black !border-emerald-300">
                  Reserve my spot
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================================
   LEVELS
   ========================================================================= */

function LevelsSection({ onCta }: { onCta: () => void }) {
  return (
    <section id="levels" className="relative py-20 md:py-28 gz-bg-cream gz-grain overflow-hidden">
      <GlowOrb className="w-[380px] h-[380px] top-1/3 -left-24" color="violet" />
      <GlowOrb className="w-[420px] h-[420px] bottom-0 right-0" color="pink" />
      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="mb-12 flex items-center justify-between flex-wrap gap-5">
          <div>
            <SectionLabel accent="#1D4ED8">IRP 2.0 Journey</SectionLabel>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight max-w-3xl">
              The IRP 2.0 Journey — Three Levels
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-black">
                L1 kicks off on <span className="text-black font-bold">{L1_ASSESSMENT_DATE}</span>
              </p>
              <button
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] text-white px-4 py-2 text-sm font-bold hover:bg-[#0B1D3A] transition-colors"
              >
                Register <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <AssessmentCountdownCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto_1fr_auto_auto] gap-5">
          {LEVELS.map((lv, idx) => (
            <motion.div
              key={lv.code}
              id={`level-${lv.code.toLowerCase()}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative h-full min-h-0 md:row-span-6 md:grid md:grid-rows-subgrid md:gap-5"
            >
              <TiltCard intensity={6} className="h-full md:row-span-6 md:grid md:grid-rows-subgrid md:gap-5">
                <div
                  className="relative h-full rounded-3xl border-2 p-7 overflow-hidden flex flex-col gap-5 md:row-span-6 md:grid md:grid-rows-subgrid md:gap-5 md:flex-none transition-shadow duration-300 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)]"
                  style={{ background: lv.bg, borderColor: `${lv.color}22` }}
                >
                  {/* Row 1 — level number + icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-7xl md:text-8xl font-bold leading-none tracking-tighter"
                      style={{ color: lv.color, opacity: 0.18 }}
                    >
                      {lv.n}
                    </span>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ background: lv.color }}
                    >
                      <lv.icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Row 2 — level tags */}
                  <div className="flex flex-wrap items-center gap-2 content-start">
                    <span
                      className="gz-tag"
                      style={{ background: `${lv.color}1A`, color: lv.color }}
                    >
                      {lv.label}
                    </span>
                    {lv.date && <span className="gz-tag bg-white/60 text-black/60">{lv.date}</span>}
                    <span className="gz-tag bg-white/60 text-black/60">{lv.duration}</span>
                  </div>

                  {/* Row 3 — title + tagline */}
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">{lv.nickname}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/85 font-medium">
                      <span className="inline-block rounded-lg bg-white/90 border border-black/10 px-3 py-1.5 shadow-sm">
                        {lv.tagline}
                      </span>
                    </p>
                  </div>

                  {/* Row 4 — assessment / eligibility (equal height across cards) */}
                  <div className="rounded-2xl bg-white/65 backdrop-blur-sm p-4 border border-black/5 h-full min-h-0">
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-black/55 mb-2 min-h-[2rem]">
                      {"sectionsHeading" in lv && (lv as { sectionsHeading?: string }).sectionsHeading
                        ? (lv as { sectionsHeading: string }).sectionsHeading
                        : "Assessment sections"}
                    </p>
                    <ul className="space-y-2">
                      {lv.sections.map((s, i) => (
                        <li key={i}>
                          <p className="text-sm font-bold leading-tight">{s.label}</p>
                          <p className="text-[11px] text-black/55 font-mono-ui">{s.meta}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Row 5 — post-assessment / unlock details (headings align across cards) */}
                  <div>
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-black/55 mb-2 min-h-[2.5rem] leading-snug">
                      {lv.postHeading}
                    </p>
                    <ul className="space-y-1.5">
                      {lv.post.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-black/75 leading-snug">
                          <span
                            className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: lv.color }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Row 6 — unlocks footer */}
                  <div
                    className="rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-bold text-white"
                    style={{ background: lv.color }}
                  >
                    <Unlock className="h-4 w-4 shrink-0" />
                    <span>Unlocks: {lv.unlocks}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   COURSES — vertical timeline (reskinned)
   ========================================================================= */

function CourseList({
  items,
  accent,
  icon: Icon,
  title,
  sub,
}: {
  items: { name: string; url: string }[] | readonly { name: string; url: string }[];
  accent: string;
  bg?: string;
  icon: typeof Code;
  title: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden bg-white shadow-sm" style={{ borderColor: `${accent}28` }}>
      <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ borderColor: `${accent}18` }}>
        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
        <span className="text-sm font-bold text-black/85">{title}</span>
        {sub && (
          <span className="ml-auto text-[10px] font-bold font-mono-ui uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>
            {sub}
          </span>
        )}
      </div>
      <ul>
        {items.map((c, i) => (
          <li key={i} className="border-b last:border-0" style={{ borderColor: `${accent}10` }}>
            <a href={c.url} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-black/[0.025] transition-colors group">
              <span className="text-sm text-black/75 group-hover:text-black transition-colors leading-snug">{c.name}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-20 group-hover:opacity-60 transition-opacity" style={{ color: accent }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoursesSection() {

  return (
    <section id="courses" className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(145deg,#FFFDF5 0%,#FFF8E8 35%,#F5F0FF 70%,#EFF6FF 100%)" }}>
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle,#A78BFA,transparent 70%)" }} aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle,#FCD34D,transparent 70%)" }} aria-hidden />

      <div className="container mx-auto max-w-5xl px-5 md:px-8 relative">

        {/* ── Header ── */}
        <div className="mb-14 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1 min-w-0">
            <SectionLabel accent="#F43F5E">// the proof</SectionLabel>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Courses to <span className="text-blue-600">lock in.</span>
              <br />
              <span className="font-serif-display italic gz-gradient-text">Learn. Build. Get Paid.</span>
            </h2>
            <p className="mt-3 text-sm text-black/55 max-w-xs leading-relaxed">
              Real students. Real stipends.<br />Pick a path. Prove your skills. Get noticed.
            </p>
          </div>
        </div>

        {/* ── Level Ladder ── */}
        <div className="relative">
          <div className="absolute left-7 md:left-9 top-4 bottom-20 w-[2px] rounded-full bg-gradient-to-b from-blue-400 via-amber-400 to-rose-400 opacity-25" aria-hidden />

          {/* L1 */}
          <div className="relative mb-10 flex gap-5 md:gap-7">
            <div className="flex flex-col items-center gap-2 shrink-0 z-10">
              <div className="group/badge w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-blue-600 text-white flex items-center justify-center font-display text-base md:text-xl font-bold shadow-lg ring-4 ring-blue-100 transition-transform duration-300 hover:scale-110 hover:rotate-6 cursor-default">
                L1
              </div>
              <Rocket className="h-5 w-5 text-blue-400 opacity-50" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-blue-600">Level 1 · The Builder</span>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight mt-0.5 mb-3">
                Frontend & Programming <span className="font-mono text-blue-500 text-base">&lt;/&gt;</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3 relative">
                <CourseList items={COURSES_L1.frontend} accent="#1D4ED8" icon={Code} title="Frontend Track" sub="5 courses" />
                <div className="relative">
                  <CourseList items={COURSES_L1.coding} accent="#2563EB" icon={GitBranch} title="Coding Track" sub="2 courses" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold font-mono-ui text-blue-600 uppercase tracking-[0.16em]">
                <ArrowRight className="h-3.5 w-3.5" /> Clear L1 → Unlock L2
              </div>
            </div>
          </div>

          {/* L2 */}
          <div className="relative mb-10 flex gap-5 md:gap-7">
            <div className="flex flex-col items-center gap-2 shrink-0 z-10">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-amber-500 text-white flex items-center justify-center font-display text-base md:text-xl font-bold shadow-lg ring-4 ring-amber-100 transition-transform duration-300 hover:scale-110 hover:-rotate-6 cursor-default">
                L2
              </div>
              <Star className="h-5 w-5 text-amber-400 opacity-50" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-amber-500">Level 2 · The AI Architect</span>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight mt-0.5 mb-3">
                Backend, Databases & Generative <em className="not-italic text-amber-500">AI</em> <Sparkles className="inline h-4 w-4 text-amber-400 align-text-bottom" />
              </h3>
              <div className="grid md:grid-cols-2 gap-3 relative">
                <CourseList items={[...COURSES_L2.backend]} accent="#F59E0B" icon={Database} title="Backend Track" sub="4 courses" />
                <div className="relative">
                  <CourseList items={[...COURSES_L2.genAi]} accent="#8B5CF6" icon={Star} title="Generative AI Track" sub="1 course" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold font-mono-ui text-amber-600 uppercase tracking-[0.16em]">
                <ArrowRight className="h-3.5 w-3.5" /> Clear L2 → Unlock L3
              </div>
            </div>
          </div>

          {/* L3 */}
          <div className="relative flex gap-5 md:gap-7">
            <div className="flex flex-col items-center gap-2 shrink-0 z-10">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-rose-500 text-white flex items-center justify-center font-display text-base md:text-xl font-bold shadow-lg ring-4 ring-rose-100 transition-transform duration-300 hover:scale-110 hover:rotate-6 cursor-default">
                L3
              </div>
              <Trophy className="h-5 w-5 text-rose-400 opacity-50" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-rose-500">Level 3 · Infinite Aura</span>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight mt-0.5 mb-3">
                Infinite Aura — Top 1% Track <Flame className="inline h-5 w-5 text-rose-500 align-text-bottom" />
              </h3>
              <div className="relative">
                <div className="rounded-2xl border-2 border-rose-100 bg-white overflow-hidden shadow-sm">
                  <div className="px-4 py-2.5 border-b border-rose-100 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-sm font-bold text-black/85">Level 3 Prep — DSA & Practice Platforms</span>
                  </div>
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-rose-100/80">
                    <ul>
                      {COURSES_L3.dsa.map((c, i) => (
                        <li key={i} className="border-b border-rose-50 last:border-0">
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                             className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-rose-50/50 transition-colors group">
                            <span className="text-sm text-black/75 group-hover:text-black leading-snug">{c.name}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-rose-400 opacity-25 group-hover:opacity-60 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {COURSES_L3.practice.map((c, i) => (
                        <li key={i} className="border-b border-rose-50 last:border-0">
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                             className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-rose-50/50 transition-colors group">
                            <span className="text-sm text-black/75 group-hover:text-black leading-snug">{c.name}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-rose-400 opacity-25 group-hover:opacity-60 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   TESTIMONIALS
   ========================================================================= */

function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const cardW = el.querySelector("[data-card]")?.clientWidth ?? 340;
    el.scrollBy({ left: dir === "right" ? cardW + 20 : -(cardW + 20), behavior: "smooth" });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardW = el.querySelector("[data-card]")?.clientWidth ?? 340;
        el.scrollBy({ left: cardW + 20, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stories" className="relative py-20 md:py-28 gz-bg-cream gz-grain overflow-hidden">
      <GlowOrb className="w-[420px] h-[420px] -top-32 right-0" color="pink" />
      <GlowOrb className="w-[380px] h-[380px] bottom-0 -left-24" color="lime" />

      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="mb-12 max-w-3xl">
          <SectionLabel accent="#F59E0B">// the proof</SectionLabel>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            They locked in.
            <br />
            <span className="font-serif-display italic gz-gradient-text">They got paid.</span>
          </h2>
          <p className="mt-4 text-sm text-black/55">
            Real students. Real stipends. Click any name for proof on LinkedIn.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-11 h-11 rounded-full bg-white border border-black/10 shadow-md items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div
            ref={ref}
            className="flex items-stretch gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                data-card
                className="flex w-[85vw] md:w-[calc((100%-40px)/3)] flex-none snap-start"
              >
                <TestimonialCard t={t} idx={i} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            aria-label="Next"
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-11 h-11 rounded-full bg-white border border-black/10 shadow-md items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, idx }: { t: typeof TESTIMONIALS[number]; idx: number }) {
  const tones = [
    { bg: "bg-white", accent: "#1D4ED8" },
    { bg: "bg-white", accent: "#F59E0B" },
    { bg: "bg-white", accent: "#F43F5E" },
    { bg: "bg-white", accent: "#10B981" },
    { bg: "bg-white", accent: "#10B981" },
  ];
  const tone = tones[idx % tones.length];
  return (
    <TiltCard intensity={5} className="w-full">
      <div className={`flex h-full flex-col rounded-3xl border-2 border-black/5 ${tone.bg} p-6 gap-3 transition-shadow hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.18)]`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={t.img}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover object-top shrink-0 border-2 border-white shadow"
              />
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                style={{ background: tone.accent }}
              >
                <CheckCircle2 className="h-3 w-3 text-white" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold leading-tight text-black">
                  {t.name}
                </span>
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.name} on LinkedIn`}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors shrink-0 shadow-sm ring-1 ring-[#0A66C2]/30"
                >
                  <Linkedin className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                </a>
              </div>
              <p className="text-xs text-black/65 leading-tight font-medium">{t.role}</p>
              <p className="text-xs text-black/45 font-mono-ui">{t.company}</p>
            </div>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${tone.accent}1A` }}
          >
            <span className="text-lg font-serif-display font-bold leading-none" style={{ color: tone.accent }}>"</span>
          </div>
        </div>
        <p className="text-sm text-black/75 leading-relaxed flex-1">{t.quote}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-black/65 border-t border-black/5 pt-3 font-mono-ui">
          <div className="inline-flex items-center gap-1">
            <Trophy className="h-3 w-3" style={{ color: tone.accent }} />
            <span>{t.stipend}/mo</span>
          </div>
          <span className="text-black/20">·</span>
          <div className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" style={{ color: tone.accent }} /> {t.duration}
          </div>
          <span className="text-black/20">·</span>
          <div className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" style={{ color: "#FBBF24" }} /> {t.rating}/5
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* =========================================================================
   CHECKLIST
   ========================================================================= */

function ChecklistSection({ onCta }: { onCta: () => void }) {
  return (
    <section id="checklist" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 gz-dotgrid opacity-30" aria-hidden />
      <div className="container mx-auto max-w-5xl px-5 md:px-8 relative">
        <div className="mb-12 max-w-3xl">
          <SectionLabel accent="#10B981">// pre-assessment checklist</SectionLabel>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            Four moves.
            <br />
            <span className="font-serif-display italic gz-gradient-text">Then you're ready.</span>
          </h2>
          <p className="mt-4 text-base text-black/65 leading-relaxed">
            Finish these before <span className="font-bold text-black/85">{L1_ASSESSMENT_DATE}</span>. Haven't registered
            yet?{" "}
            <button onClick={onCta} className="font-bold text-[#1D4ED8] underline-offset-2 hover:underline">
              Lock your slot →
            </button>
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {CHECKLIST.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl border-2 border-black/10 p-7 overflow-hidden bg-white hover:border-black/30 transition-colors"
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: c.accent }}
              />
              <div className="relative flex items-start gap-5">
                <div
                  className="font-display text-5xl md:text-6xl font-bold leading-none tracking-tighter"
                  style={{ color: c.accent }}
                >
                  {c.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-bold leading-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-black/65 leading-relaxed">{c.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   REGISTER CTA
   ========================================================================= */

function RegisterSection({ onCta }: { onCta: () => void }) {
  return (
    <section id="register" className="relative py-20 md:py-32 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <GlowOrb className="w-[520px] h-[520px] -top-32 -left-24" color="violet" />
        <GlowOrb className="w-[520px] h-[520px] bottom-0 right-0" color="pink" />
        <GlowOrb className="w-[380px] h-[380px] bottom-1/4 left-1/3" color="cyan" />
      </div>
      <div className="absolute inset-0 gz-gridlines opacity-[0.05]" aria-hidden />
      <div className="container mx-auto max-w-5xl px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-amber-400/35 bg-amber-500/10 px-4 py-3 mb-6">
              <Clock className="h-5 w-5 shrink-0 text-amber-300" aria-hidden />
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] font-bold text-amber-200/80">
                  Level 1 assessment
                </p>
                <p className="font-display text-lg md:text-xl font-bold text-white">{L1_ASSESSMENT_FULL}</p>
              </div>
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.92] tracking-tight">
              Stop scrolling.
              <br />
              <span className="font-serif-display italic gz-gradient-text">Start shipping.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Register now for the Summer 2026 cohort (YOG 2028 & 2029). Your Level 1 assessment is on{" "}
              <span className="font-bold text-white">{L1_ASSESSMENT_DATE}</span> — watch your registered email updates.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white text-black p-6 md:p-7 border border-white/10 shadow-[0_30px_80px_-30px_rgba(255,255,255,0.2)]">
              <div className="space-y-4 mb-5">
                <div className="flex items-start gap-3 rounded-2xl p-4 bg-blue-50 border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-bold">Open the registration form</p>
                    <p className="text-xs text-black/60">Takes ~2 minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl p-4 bg-amber-50 border border-amber-100">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-bold">Watch your email</p>
                    <p className="text-xs text-black/60">
                      L1 assessment link for {L1_ASSESSMENT_DATE}, plus prep resources and result updates.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onCta}
                className="block w-full text-center rounded-2xl bg-black text-white font-bold py-4 text-base tracking-tight hover:bg-blue-600 transition-colors"
              >
                Register for IRP 2.0 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FAQ
   ========================================================================= */

function FAQSection() {
  const [openCat, setOpenCat] = useState<string | null>("eligibility");
  const [openQ, setOpenQ] = useState<Record<string, boolean>>({});

  const toggleQ = (key: string) =>
    setOpenQ((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section id="faq" className="relative py-20 md:py-28 gz-bg-cream gz-grain">
      <GlowOrb className="w-[360px] h-[360px] -bottom-24 right-0" color="cyan" />
      <div className="container mx-auto max-w-4xl px-5 md:px-8 relative">
        <div className="mb-12 max-w-3xl">
          <SectionLabel accent="#10B981">// frequently asked</SectionLabel>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            Every IRP 2.0 question.
            <br />
            <span className="font-serif-display italic gz-gradient-text">Answered here.</span>
          </h2>
        </div>

        <div className="rounded-3xl border-2 border-black/10 bg-white overflow-hidden">
          {FAQ.map((cat, ci) => {
            const isOpen = openCat === cat.id;
            return (
              <div key={cat.id} className={ci > 0 ? "border-t border-black/10" : ""}>
                <button
                  onClick={() => setOpenCat(isOpen ? null : cat.id)}
                  className="w-full flex items-center justify-between gap-3 px-5 md:px-7 py-5 text-left group hover:bg-black/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-ui text-[10px] tracking-[0.22em] uppercase font-bold text-black/45">
                      0{ci + 1}
                    </span>
                    <span className="font-display text-lg md:text-xl font-bold leading-tight">{cat.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-black/45 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-7 pb-5 space-y-2">
                        {cat.questions.map((q, qi) => {
                          const key = `${cat.id}-${qi}`;
                          const open = !!openQ[key];
                          return (
                            <div
                              key={key}
                              className="rounded-2xl border border-black/10 overflow-hidden bg-white"
                            >
                              <button
                                onClick={() => toggleQ(key)}
                                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-black/[0.02] transition-colors"
                              >
                                <span className="text-sm font-semibold text-black/85">{q.q}</span>
                                <ChevronDown
                                  className={`h-4 w-4 text-black/40 shrink-0 transition-transform ${
                                    open ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <AnimatePresence initial={false}>
                                {open && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="px-4 pb-4 text-sm text-black/70 leading-relaxed">{q.a}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FOOTER
   ========================================================================= */

function Footer({ onCta }: { onCta: () => void }) {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <GlowOrb className="w-[420px] h-[420px] -top-32 left-1/4" color="violet" />
        <GlowOrb className="w-[420px] h-[420px] bottom-0 right-1/4" color="pink" />
      </div>
      <div className="relative">
        <div className="border-y border-white/10 overflow-hidden">
          <Marquee
            items={["★", "lock in.", "★", "level up.", "★", "get paid.", "★", "your era · 2026", "★", "irp 2.0", "★", "nxtwave academy"].map((t, i) => (
              <span key={i} className="font-serif-display italic text-5xl md:text-7xl gz-gradient-text whitespace-nowrap">
                {t}
              </span>
            ))}
            className="py-6"
          />
        </div>
        <div className="container mx-auto max-w-6xl px-5 md:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <img
                src="/nxtwave-academy-logo.png"
                alt="NxtWave Academy"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="mt-4 text-sm text-white/55 max-w-xs">
                Building the structured path between college and your first paid internship.
              </p>
            </div>
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-white/45 mb-3">
                // navigate
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { id: "vibe", l: "Why IRP" },
                  { id: "levels", l: "Levels" },
                  { id: "courses", l: "Courses" },
                  { id: "stories", l: "Stories" },
                  { id: "checklist", l: "Checklist" },
                  { id: "faq", l: "FAQ" },
                ].map((x) => (
                  <li key={x.id}>
                    <button
                      onClick={() => document.getElementById(x.id)?.scrollIntoView({ behavior: "smooth" })}
                      className="text-white/70 hover:text-emerald-300 transition-colors"
                    >
                      → {x.l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-white/45 mb-3">
                // ready?
              </p>
              <p className="font-display text-2xl font-bold leading-tight mb-2">
                Slot in for IRP 2.0.
              </p>
              <p className="text-sm text-amber-200/90 font-mono-ui mb-4">
                L1 assessment · {L1_ASSESSMENT_DATE}
              </p>
              <button
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-300 text-black px-5 py-2.5 text-sm font-bold tracking-tight hover:bg-white transition-colors"
              >
                Register now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} NxtWave Academy. All rights reserved.
            </p>
            <p className="text-xs text-white/50 font-mono-ui">// built for YOG 2028 & 2029 · lock in fr</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   PAGE
   ========================================================================= */

/* =========================================================================
   ELITE OUTCOMES — "Where the Top 1% Land" (dark bento, L3 prestige closer)
   ========================================================================= */

const ELITE_HERO_IMAGE = "/thub-campus.png";

const ELITE_TILES = [
  {
    eyebrow: "",
    title: "Real desks. Real teams. Real work.",
    sub: "",
    icon: Cpu,
    accent: "#60A5FA",
    image: "/t-hub-campus.png",
  },
  {
    eyebrow: "",
    title: "Not a simulation. An actual internship.",
    sub: "",
    icon: Rocket,
    accent: "#F59E0B",
    image: "/top1-product.png",
  },
] as const;

function EliteOutcomesSection() {
  return (
    <section
      id="outcomes"
      className="relative overflow-hidden bg-[#08070C] text-white py-20 md:py-28"
    >
      {/* ambient halos */}
      <div className="pointer-events-none absolute -top-32 left-[18%] h-[440px] w-[440px] rounded-full bg-amber-500/[0.16] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-6rem] right-[14%] h-[380px] w-[380px] rounded-full bg-indigo-500/[0.14] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" aria-hidden>
        <div className="gz-dotgrid h-full w-full" />
      </div>

      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="mb-10 md:mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 font-mono-ui text-[10px] font-black uppercase tracking-[0.28em] text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden /> L3 · Infinite Aura
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              Where the Top 1%{" "}
              <span className="font-serif-display italic bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Land.
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
              Reach Level 3 and unlock{" "}
              <span className="text-amber-300 font-semibold">₹25,000+/month</span> internships.
            </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Hero tile — T-Hub campus, spans 2 cols on md */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden border border-white/[0.08] min-h-[420px] md:min-h-[560px] flex flex-col"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, rgba(245,158,11,0.22), transparent 60%), linear-gradient(180deg,#0E0B17,#070512)",
            }}
          >
            <img
              src={ELITE_HERO_IMAGE}
              alt="Premium tech campus at night"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1400ms] group-hover:scale-[1.06]"
              style={{ filter: "saturate(1.05) brightness(0.78)" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
            <div
              className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
              aria-hidden
            />


            <div className="relative mt-auto p-5 md:p-7">
              <div className="font-display text-2xl md:text-3xl font-black leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                Build, launch, and grow with real-world opportunities.
              </div>
            </div>
          </motion.div>

          {ELITE_TILES.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-3xl overflow-hidden border border-white/[0.08] min-h-[200px] md:min-h-[268px] flex flex-col hover:border-white/[0.25] transition-colors"
                style={{
                  background: `radial-gradient(120% 80% at 20% -10%, ${t.accent}26, transparent 60%), linear-gradient(180deg,#100E17,#070512)`,
                }}
              >
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  style={{ filter: "saturate(1) brightness(0.7)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />


                <div className="relative mt-auto p-5">
                  <div className="font-display text-lg md:text-xl font-bold leading-tight drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                    {t.title}
                  </div>
                  {t.sub && (
                    <p className="mt-1.5 text-[12.5px] md:text-sm text-white/80 max-w-[28ch] leading-snug">
                      {t.sub}
                    </p>
                  )}
                </div>

                <div
                  className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity"
                  style={{ background: t.accent }}
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mentor wall — subtle brand marquee echoing prestige */}
        <div className="mt-8 md:mt-10 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#08070C] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#08070C] to-transparent z-10" />
          <Marquee
            items={["Microsoft", "Swiggy", "Google", "Amazon", "Salesforce", "Flipkart", "Zepto", "Adobe", "Razorpay", "CRED"].map(
              (c, i) => (
                <span
                  key={i}
                  className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white/60"
                >
                  {c} <span className="text-amber-300/70">✦</span>
                </span>
              ),
            )}
            className="py-4"
          />
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const { trackClick } = useAnalytics();

  const onCta = useCallback(() => {
    trackClick("register_cta", "Register Button");
    window.open(REGISTER_URL, "_blank", "noopener,noreferrer");
  }, [trackClick]);

  return (
    <div className="relative min-h-screen text-black gz-bg-cream font-sans">
      <div className="gz-noise-overlay" aria-hidden />
      <ScrollProgress />
      <CursorGlow />
      <NavBar onCta={onCta} />
      <main>
        <Hero onCta={onCta} />
        <TickerStrip />
        <StatsBar />
        <LevelsSection onCta={onCta} />
        <CoursesSection />
        <WhyBento onCta={onCta} />
        <TestimonialsSection />
        <EliteOutcomesSection />
        <ChecklistSection onCta={onCta} />
        <RegisterSection onCta={onCta} />
        <FAQSection />
      </main>
      <PageFeedbackButton />
      <Footer onCta={onCta} />
    </div>
  );
}
