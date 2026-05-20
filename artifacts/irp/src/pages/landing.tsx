import React, { useState, useRef, useEffect, useMemo } from "react";
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
  Hash,
  MousePointerClick,
  Brain,
  Unlock,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =========================================================================
   DATA — preserved from the original (courses, testimonials, FAQ, checklist)
   ========================================================================= */

const LEVELS = [
  {
    n: "01",
    code: "L1",
    label: "Level 1",
    nickname: "The Hustler",
    tagline: "Your entry point — foundational frontend and programming.",
    date: "14 Jun 2026",
    duration: "~2 hrs assessment window",
    icon: User,
    color: "#1D4ED8",
    bg: "#E0E7FF",
    sections: [
      { label: "Problem Solving (Python / C++)", meta: "Coding · 1.5 hours · 4 questions" },
      { label: "FE — HTML, CSS, JS, React", meta: "MCQ · 30 minutes · 30 questions" },
    ],
    post: [
      "FE project (Topin platform) · build & submit · 12 hours",
      "AI mock interview (NxtMock) · project + resume · 1 hour",
      "Human mock interview · project + resume · 1 hour",
    ],
    unlocks: "Eligibility to appear for Level 2",
    postHeading: "After the MCQ (same window)",
  },
  {
    n: "02",
    code: "L2",
    label: "Level 2",
    nickname: "The Main Character",
    tagline: "Backend, databases & GenAI — the full‑stack layer.",
    date: "≈1 month after L1",
    duration: "~2 hrs MCQ (+ post rounds)",
    icon: Cpu,
    color: "#F59E0B",
    bg: "#FEF3C7",
    sections: [
      { label: "BE — NodeJS + Express", meta: "MCQ · 20 minutes · 20 questions" },
      { label: "Database — SQL, NoSQL, MongoDB", meta: "MCQ + SQL coding · 80 minutes · 20 MCQ + 3 SQL" },
      { label: "GenAI", meta: "MCQ · 20 minutes · 20 questions" },
      { label: "Combined MCQ assessment", meta: "~2 hours total · 63 questions" },
    ],
    post: [
      "Full stack + AI project (platform TBD) · build & submit · 24 hours",
      "AI mock interview · project + resume · 1 hour",
      "Human mock interview · project + resume · 1 hour",
    ],
    unlocks: "Internship opportunities (₹5K–₹15K) · access to L3 Infinite Aura",
    postHeading: "After the MCQ assessment",
  },
  {
    n: "03",
    code: "L3",
    label: "Level 3",
    nickname: "Infinite Aura",
    tagline: "Top 1% track — ₹25K+ stipends & curated mentorship.",
    date: "Clear L1 + L2",
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
      "Mentorship from senior engineers at Microsoft, Apple, Google & Salesforce",
      "Interactions with NxtWave's founding team",
    ],
    unlocks: "Curated opportunities for students who complete the full IRP path",
    sectionsHeading: "Eligibility pillars",
    postHeading: "What you unlock after L1 + L2",
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
    { name: "Data Structures & Algorithms — Level 1", url: "https://learning.ccbp.in/course?c_id=058b97cb-16db-4098-8b1e-3e7cbffe1db4" },
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
      { q: "Are all assessments online?", a: "Yes. All rounds under IRP 2.0 — MCQs, projects, AI Mock Interview, and Human Mock Interview — are 100% online. There are no offline rounds." },
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
    id: "opportunities",
    title: "Where Opportunities Are Displayed",
    questions: [
      { q: "Where will internship opportunities be shown after I clear the levels?", a: "Internship opportunities will be displayed on the IRP 2.0 page — this will be your single destination for viewing and applying to opportunities. The Jobs Board used previously will not be used for IRP 2.0 opportunities." },
      { q: "When will internship opportunities start appearing?", a: "Opportunities will be made available after students have completed the Level 1 and Level 2 assessments and results are processed. Watch your email for updates." },
    ],
  },
  {
    id: "courses",
    title: "Courses & Platform",
    questions: [
      { q: "Where do I find the courses I need to study?", a: "All courses are available in your NxtWave Learning Portal. The course names mapped to Level 1 and Level 2 are listed in the \"Courses to Prepare\" section above." },
      { q: "Will a preparation roadmap be provided?", a: "Yes. Preparation guidance will be shared through email and our Guidance Meets. The IRP 2.0 page will also have course mapping details." },
      { q: "Does completing IRP contribute to Growth Cycle progress?", a: "IRP assessments and Growth Cycles are separate tracks. Completing courses in your Growth Cycle is important for IRP preparation, but IRP completion itself does not directly increment Growth Cycle progress." },
      { q: "Can I use VS Code or other tools for the project rounds?", a: "Yes. You can use your preferred IDE (VS Code, etc.) for the project rounds. The submission format will be specified when the project brief is shared." },
    ],
  },
] as const;

const REGISTER_URL = "https://forms.ccbp.in/form/irp-2-online-registration";

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
      "bg-black text-white border-black hover:bg-blue-600 hover:border-blue-600",
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
const SKYLINE_BRANDS = [
  "GOOGLE",
  "MICROSOFT",
  "AMAZON",
  "APPLE",
  "META",
  "SALESFORCE",
  "NETFLIX",
  "ADOBE",
  "NVIDIA",
  "IBM",
] as const;

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
    <div className="absolute bottom-0 left-0 right-0 h-[min(420px,48vh)] overflow-hidden pointer-events-none select-none">
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
      <svg viewBox="0 0 1500 320" preserveAspectRatio="xMidYMax meet" className="absolute bottom-0 left-0 w-full h-[72%]">
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
      <nav className="mx-auto max-w-6xl gz-glass rounded-full px-3 md:px-4 py-2 flex items-center justify-between shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]">
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
              Register Now →
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
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  const words = ["Lock", "In.", "Level", "Up.", "Get", "Paid."];

  const pill =
    "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-[11px] font-mono-ui font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm shadow-[0_0_0_1px_rgba(245,158,11,0.12)]";

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden gz-grain bg-[#FAF7F0]">
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-[#0B1D3A] via-[#F59E0B] to-[#0B1D3A]" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 z-0 h-[62%] min-h-[400px] md:min-h-[480px] bg-gradient-to-b from-[#050D1A] via-[#102A52] to-transparent"
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

      <motion.div style={{ y: skylineY }} className="absolute inset-x-0 bottom-0 z-[2]">
        <CitySkyline />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 container mx-auto max-w-6xl px-5 md:px-8 pt-8 md:pt-14 pb-[min(360px,40vh)] md:pb-[min(400px,42vh)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2"
        >
          <span className="font-serif-display text-lg md:text-xl italic text-amber-200/95">Internship Readiness Path 2.0</span>
          <span className="hidden sm:block h-4 w-px bg-white/20" aria-hidden />
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.28em] text-white/50">Flagship cohort · Summer 2026</span>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={pill}>
            <span className="relative inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-gz-pulse-ring" />
            </span>
            Open for registration
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className={pill}
          >
            <Hash className="h-3 w-3 text-amber-300" /> YOG 2028 & 2029
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className={pill}
          >
            <Flame className="h-3 w-3 text-amber-300" /> L1 · 14 Jun 2026
          </motion.span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[clamp(2.6rem,8vw,6.2rem)] font-bold leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
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
                className="gz-gradient-text font-serif-display italic"
              >
                your first stipend era.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 max-w-xl text-lg md:text-xl text-white/75 leading-relaxed"
            >
              Built for 1st & 2nd year students — the same rigour you expect on campus, pointed at real companies and
              paid internships. Three levels. Real assessments. Real projects. Stipends from ₹5K to ₹25K+.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-3 items-center"
            >
              <MagneticButton onClick={onCta} variant="primary">
                Register for IRP 2.0
              </MagneticButton>
              <button
                onClick={() => document.getElementById("levels")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold tracking-tight border border-white/25 text-white bg-white/[0.06] hover:bg-white/[0.12] hover:border-amber-400/50 backdrop-blur-sm transition-colors"
              >
                <MousePointerClick className="h-4 w-4 text-amber-300" />
                View the pathway
              </button>

              <div className="hidden md:flex items-center gap-2 ml-2 text-xs text-white/45">
                <span className="font-mono-ui text-amber-200/80">{`//`}</span>
                <span>2,000+ students from the last batch</span>
              </div>
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
                    progression.ts
                  </span>
                  <span className="text-amber-700/80">live</span>
                </div>
                <div className="space-y-3">
                  {LEVELS.map((lv, i) => (
                    <motion.div
                      key={lv.code}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                      className="flex items-center gap-3 rounded-2xl border border-black/[0.06] p-3 transition-colors hover:border-black/15"
                      style={{ background: lv.bg }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                        style={{ background: lv.color }}
                      >
                        {lv.code}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold leading-tight">{lv.nickname}</div>
                        <div className="font-mono-ui text-[11px] text-black/55">{lv.duration}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-40" />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="mt-5 flex items-center justify-between rounded-2xl bg-[#0B1D3A] p-3 text-white"
                >
                  <span className="flex items-center gap-2 text-xs font-mono-ui text-white/85">
                    <Unlock className="h-3.5 w-3.5 text-amber-300" />
                    complete all three →
                  </span>
                  <span className="text-xs font-bold text-amber-300">₹25K+</span>
                </motion.div>
              </div>
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full gz-conic animate-gz-spin-slow opacity-90" />
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-white" />
              <div className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1D3A] shadow-lg">
                <Sparkles className="h-5 w-5 animate-gz-wiggle text-amber-300" />
              </div>
            </TiltCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-14 flex items-center gap-3 text-xs font-mono-ui uppercase tracking-[0.28em] text-white/40"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
          continue to programme details<span className="animate-gz-blink text-amber-300">_</span>
        </motion.div>
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
    "✦ FIRST ASSESSMENT 14 JUNE",
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
        <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <SectionLabel accent="#1D4ED8">// numbers don't lie</SectionLabel>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
              The path is engineered.
              <br />
              <span className="font-serif-display italic gz-gradient-text">The stipends are real.</span>
            </h2>
          </div>
          <p className="text-sm text-black/55 max-w-sm">
            From your first assessment to your first paycheck — every checkpoint is built so you actually ship.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <StatCounter value={3} label="levels / one path" accent="#1D4ED8" />
          <StatCounter value={25} prefix="₹" suffix="K+" label="top monthly stipend" accent="#F59E0B" />
          <StatCounter value={50} suffix="+" label="partner companies" accent="#F43F5E" />
          <StatCounter value={2000} suffix="+" label="students from last batch" accent="#10B981" />
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
          <SectionLabel accent="#F59E0B">// why this is different</SectionLabel>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            Other "internships" give certificates.
            <br />
            <span className="font-serif-display italic gz-gradient-text">We give you a paycheck.</span>
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
              <span className="gz-gradient-text">₹5K – ₹15K / month</span>
              <br />
              shipping real code.
            </h3>
            <p className="mt-5 text-white/65 text-base max-w-md">
              Not "shadowing." Not "exposure." Authentication systems, full-stack apps, AI integrations — for actual
              partner companies.
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
            <p className="mt-1 text-sm text-amber-900/70">L3 cohorts unlock mentorship across Microsoft, Apple, Google & Salesforce.</p>
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
            className="col-span-12 md:col-span-7 relative rounded-3xl bg-emerald-200 p-6 md:p-7 overflow-hidden gz-magnet"
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-6 w-6 text-black" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.2em] font-bold">elite mentors</span>
            </div>
            <Marquee
              items={["Microsoft", "Apple", "Google", "Salesforce", "Bellcorp Studio", "Chirpn IT", "2xCabs"].map((c, i) => (
                <span
                  key={i}
                  className="font-display text-3xl md:text-5xl font-bold tracking-tight whitespace-nowrap text-black/85"
                >
                  {c} ✦
                </span>
              ))}
              className="-mx-7"
            />
          </motion.div>

          {/* Card 6 — quote */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-5 relative rounded-3xl bg-rose-100 p-6 md:p-7 overflow-hidden gz-magnet"
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
                <p className="gz-tag bg-white/10 text-white/70 mb-3">// register</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                  Locked in? <span className="gz-gradient-text">Slot in for IRP 2.0.</span>
                </h3>
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

function LevelsSection() {
  return (
    <section id="levels" className="relative py-20 md:py-28 gz-bg-cream gz-grain overflow-hidden">
      <GlowOrb className="w-[380px] h-[380px] top-1/3 -left-24" color="violet" />
      <GlowOrb className="w-[420px] h-[420px] bottom-0 right-0" color="pink" />
      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
          <div>
            <SectionLabel accent="#1D4ED8">IRP 2.0 Journey</SectionLabel>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight max-w-3xl">
              The IRP 2.0 Journey — Three Levels
            </h2>
          </div>
          <p className="text-sm text-black/55 max-w-sm">
            Each level mixes proctored assessments with build rounds and mock interviews. Timeline for Level 2 lands ~1 month after Level 1 (July last week tentative).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:items-stretch">
          {LEVELS.map((lv, idx) => (
            <motion.div
              key={lv.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative h-full min-h-0"
            >
              <TiltCard intensity={6} className="h-full">
                <div
                  className="relative h-full rounded-3xl border-2 p-7 overflow-hidden flex flex-col gap-5 transition-shadow duration-300 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)]"
                  style={{ background: lv.bg, borderColor: `${lv.color}22` }}
                >
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
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="gz-tag"
                        style={{ background: `${lv.color}1A`, color: lv.color }}
                      >
                        {lv.label}
                      </span>
                      <span className="gz-tag bg-white/60 text-black/60">{lv.date}</span>
                      <span className="gz-tag bg-white/60 text-black/60">{lv.duration}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">{lv.nickname}</h3>
                    <p className="mt-1 text-sm text-black/60 font-serif-display italic">{lv.tagline}</p>
                  </div>
                  <div className="rounded-2xl bg-white/65 backdrop-blur-sm p-4 border border-black/5">
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-black/55 mb-2">
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
                  <div>
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-black/55 mb-2">
                      {"postHeading" in lv && (lv as { postHeading?: string }).postHeading
                        ? (lv as { postHeading: string }).postHeading
                        : "Post-assessment"}
                    </p>
                    <ul className="space-y-1.5">
                      {lv.post.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-black/75">
                          <span
                            className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: lv.color }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="mt-auto rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-bold text-white"
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
  bg,
  icon: Icon,
  title,
  sub,
}: {
  items: { name: string; url: string }[];
  accent: string;
  bg: string;
  icon: typeof Code;
  title: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border-2 overflow-hidden bg-white" style={{ borderColor: `${accent}22` }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: accent, color: "#fff" }}>
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-sm font-bold tracking-tight">{title}</span>
        {sub && <span className="ml-auto gz-tag bg-white/20 text-white shrink-0">{sub}</span>}
      </div>
      <ul className="divide-y divide-black/5">
        {items.map((c, i) => (
          <li key={i}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-black/[0.03] transition-colors group"
            >
              <span className="text-sm font-medium text-black/85 group-hover:translate-x-1 transition-transform">
                {c.name}
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 opacity-30 group-hover:opacity-100 transition-opacity"
                style={{ color: accent }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoursesSection() {
  return (
    <section id="courses" className="relative py-20 md:py-28 bg-white">
      <div className="absolute inset-0 gz-gridlines opacity-40" aria-hidden />
      <div className="container mx-auto max-w-5xl px-5 md:px-8 relative">
        <div className="mb-14 max-w-3xl">
          <SectionLabel accent="#F43F5E">// your learning stack</SectionLabel>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            Courses to lock in.
            <br />
            <span className="font-serif-display italic gz-gradient-text">All on NxtWave.</span>
          </h2>
          <p className="mt-4 text-sm text-black/55">Tap any course to open it directly in the Learning Portal.</p>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-7 md:left-9 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-blue-500 via-amber-500 to-rose-400 z-0" />

          {/* L1 */}
          <div className="relative z-10 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl bg-blue-600 text-white flex items-center justify-center font-display text-base md:text-xl font-bold shadow-lg ring-4 ring-blue-100 shrink-0">
                L1
              </div>
              <div>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-blue-600">
                  Level 1 · The Hustler
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
                  Foundational frontend & programming
                </h3>
              </div>
            </div>
            <div className="md:ml-[88px] ml-[72px] grid md:grid-cols-2 gap-4">
              <CourseList items={COURSES_L1.frontend} accent="#1D4ED8" bg="#E0E7FF" icon={Code} title="Frontend Track" sub="6 courses" />
              <CourseList items={COURSES_L1.coding} accent="#2563EB" bg="#FEF3C7" icon={GitBranch} title="Coding Track" sub="2 courses" />
            </div>
          </div>

          {/* Arrow */}
          <div className="md:ml-[88px] ml-[72px] mb-8 flex items-center gap-2 text-xs font-mono-ui uppercase tracking-[0.2em] font-bold text-blue-600">
            <ArrowRight className="h-4 w-4" /> clear L1 → unlock L2
          </div>

          {/* L2 */}
          <div className="relative z-10 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl bg-amber-500 text-white flex items-center justify-center font-display text-base md:text-xl font-bold shadow-lg ring-4 ring-amber-100 shrink-0">
                L2
              </div>
              <div>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-amber-500">
                  Level 2 · The Main Character (~1 month after L1)
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
                  Backend, databases & Generative AI
                </h3>
              </div>
            </div>
            <div className="md:ml-[88px] ml-[72px] grid md:grid-cols-2 gap-4">
              <CourseList
                items={[...COURSES_L2.backend]}
                accent="#2563EB"
                bg="#DBEAFE"
                icon={Database}
                title="Backend Track"
                sub="4 courses"
              />
              <CourseList
                items={[...COURSES_L2.genAi]}
                accent="#1D4ED8"
                bg="#E0E7FF"
                icon={Star}
                title="Generative AI Track"
                sub="1 course"
              />
            </div>
          </div>

          {/* Arrow */}
          <div className="md:ml-[88px] ml-[72px] mb-8 flex items-center gap-2 text-xs font-mono-ui uppercase tracking-[0.2em] font-bold text-rose-500">
            <ArrowRight className="h-4 w-4" /> clear L1 + L2 → unlock L3
          </div>

          {/* L3 */}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl bg-rose-500 text-white flex items-center justify-center font-display text-base md:text-xl font-bold shadow-lg ring-4 ring-rose-100 shrink-0">
                L3
              </div>
              <div>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-rose-500">
                  Level 3 · Infinite Aura
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">Infinite Aura · top 1% track</h3>
              </div>
            </div>
            <div className="md:ml-[88px] ml-[72px]">
              <div className="rounded-2xl border-2 border-rose-200 overflow-hidden bg-white">
                <div className="px-4 py-3 flex items-center gap-2 bg-rose-500 text-white">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-bold tracking-tight">Level 3 prep — DSA & platforms</span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-rose-100">
                  <div>
                    <p className="px-4 pt-3 pb-1 font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-rose-500">
                      NxtWave courses
                    </p>
                    <ul className="divide-y divide-black/5">
                      {COURSES_L3.dsa.map((c, i) => (
                        <li key={i}>
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-rose-50 transition-colors group"
                          >
                            <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                              {c.name}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-rose-400 opacity-30 group-hover:opacity-100" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="px-4 pt-3 pb-1 font-mono-ui text-[10px] uppercase tracking-[0.22em] font-bold text-rose-500">
                      Practice platforms
                    </p>
                    <ul className="divide-y divide-black/5">
                      {COURSES_L3.practice.map((c, i) => (
                        <li key={i}>
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-rose-50 transition-colors group"
                          >
                            <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                              {c.name}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-rose-400 opacity-30 group-hover:opacity-100" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-4 py-3 bg-rose-50 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-rose-500 shrink-0" />
                  <p className="text-xs text-rose-900 font-medium">
                    Eligibility: clear Level 1 & 2 first. Then show readiness on DSA Level 2–4, Full Stack Gen AI, CodeChef (rating {">"} 1600), and the human mock loop — opportunities are curated for students who finish the full IRP journey.
                  </p>
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
          <a
            href="https://docs.google.com/document/d/1uU0XvFUz3CAw1kGKXuoIASiLk6SOzpZEA2bSkEjLQu8/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black text-white text-sm font-bold px-5 py-2.5 hover:bg-blue-600 transition-colors"
          >
            Sample interview questions <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-black/50 font-mono-ui">// swipe / drag the cards to see more</p>
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
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-display text-base font-bold leading-tight hover:text-[#0A66C2] transition-colors group"
              >
                {t.name}
                <Linkedin className="h-3.5 w-3.5 text-[#0A66C2] opacity-70 group-hover:opacity-100 shrink-0" />
              </a>
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

function ChecklistSection() {
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
            <SectionLabel accent="#10B981">// the moment</SectionLabel>
            <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold leading-[0.92] tracking-tight">
              Stop scrolling.
              <br />
              <span className="font-serif-display italic gz-gradient-text">Start shipping.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Slots are open for the Summer 2026 cohort. Eligible if you're YOG 2028 or YOG 2029. Watch your registered
              email for assessment + prep updates.
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
                      Assessment schedules, prep resources, and result updates land in your inbox.
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
              <p className="mt-3 text-[11px] text-black/55 text-center font-mono-ui">
                // clearing only L1 ≠ internship · clear L1 + L2 to unlock
              </p>
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
              <p className="font-display text-2xl font-bold leading-tight mb-4">
                Slot in for IRP 2.0.
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

export default function LandingPage() {
  const onCta = () => {
    window.open(REGISTER_URL, "_blank", "noopener,noreferrer");
  };

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
        <WhyBento onCta={onCta} />
        <LevelsSection />
        <CoursesSection />
        <TestimonialsSection />
        <ChecklistSection />
        <RegisterSection onCta={onCta} />
        <FAQSection />
      </main>
      <Footer onCta={onCta} />
    </div>
  );
}
