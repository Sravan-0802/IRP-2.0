import React, { useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, BookOpen, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, Code, 
  Database, ExternalLink, FileCode2, FileText, Info, Menu, Rocket, Server, Star, Terminal, Trophy, 
  User, CheckCircle, Navigation, X, XCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const scrollTestimonials = (dir: "left" | "right") => {
    if (!testimonialsRef.current) return;
    const cardW = testimonialsRef.current.querySelector("div")?.offsetWidth ?? 340;
    testimonialsRef.current.scrollBy({ left: dir === "right" ? cardW + 20 : -(cardW + 20), behavior: "smooth" });
  };
  const allFaqItems = ["item-1","item-2","item-3","item-3b","item-4","item-5","item-6","item-7","item-7b","item-7c","item-7d","item-8","item-9","item-10","item-10b","item-10c","item-10d","item-10e","item-10f","item-11","item-11b","item-11c","item-12","item-13","item-13b","item-14","item-15","item-15b","item-15c","item-16","item-16b","item-17","item-17b","item-17c","item-17d","item-18","item-18b","item-19","item-20","item-20b","item-20c"];
  const [faqValues, setFaqValues] = useState<string[]>(["item-1","item-4","item-8","item-11","item-13","item-16","item-18","item-19"]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('hero')}>
            <img src="/nxtwave-academy-logo.png" alt="NxtWave Academy" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollTo('about')} className="hover:text-accent transition-colors">About</button>
            <button onClick={() => scrollTo('levels')} className="hover:text-accent transition-colors">Levels</button>
            <button onClick={() => scrollTo('courses')} className="hover:text-accent transition-colors">Courses</button>
            <button onClick={() => scrollTo('checklist')} className="hover:text-accent transition-colors">Checklist</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-accent transition-colors">FAQ</button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => scrollTo('register')} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Register Now
            </Button>
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg px-4 py-2 flex flex-col">
            {[
              { id: 'about', label: 'About' },
              { id: 'levels', label: 'Levels' },
              { id: 'courses', label: 'Courses' },
              { id: 'checklist', label: 'Checklist' },
              { id: 'faq', label: 'FAQ' },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }}
                className="text-left text-base font-medium text-muted-foreground hover:text-accent py-3 border-b border-border/20 last:border-0 transition-colors">
                {label}
              </button>
            ))}
            <Button onClick={() => { scrollTo('register'); setMenuOpen(false); }} className="bg-accent text-accent-foreground hover:bg-accent/90 my-3 w-full">
              Register Now
            </Button>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-white h-[420px] md:h-[460px]">
          {/* Background gradients */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,_#dbeafe_0%,_transparent_70%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_60%_at_100%_80%,_#e0e7ff_0%,_transparent_60%)]" />
          {/* Decorative dots */}
          <div className="absolute top-6 right-[48%] -z-10 grid grid-cols-5 gap-2 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            ))}
          </div>
          {/* Floating accent ring */}
          <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full border-[20px] border-blue-100/50 -z-10" />
          <div className="absolute bottom-0 left-[30%] w-32 h-32 rounded-full border-[12px] border-indigo-100/40 -z-10" />

          <div className="container mx-auto max-w-6xl px-6 md:px-10 h-full">
            <div className="flex flex-row items-stretch h-full gap-0">

              {/* Left — text, centred vertically */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-[55_55_0%] flex flex-col justify-center py-8 pr-0 md:pr-6"
              >
                <div className="flex flex-row items-center gap-2 mb-4 flex-wrap">
                  <Badge className="bg-blue-700 text-white border-none px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap">
                    ✦ Summer 2026 IRP 2.0 Batch — Open Now!
                  </Badge>
                  <Badge className="bg-accent/10 text-accent border-accent/20 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap">
                    First Assessment: 14th June 2026
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 leading-[1.1]">
                  Internship Readiness
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Path 2.0</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md leading-relaxed">
                  Built exclusively for 1st &amp; 2nd Year Students (YOG 2028 &amp; 2029).
                  Earn your first stipend internship through NxtWave Academy's structured assessments and tailored path!
                </p>

                <div className="flex flex-row gap-3 flex-wrap">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm px-5 py-2.5 rounded-full shadow-md shadow-accent/20" onClick={() => scrollTo('register')}>
                    Register for IRP 2.0 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-blue-50 text-sm px-5 py-2.5 rounded-full" onClick={() => scrollTo('levels')}>
                    View the Path
                  </Button>
                </div>
              </motion.div>

              {/* Right — illustration, 75% of section height */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex-[45_45_0%] hidden md:flex items-end justify-center relative"
              >
                {/* soft glow under illustration */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-blue-300/20 blur-2xl rounded-full" />
                <img
                  src="/hero-illustration.png"
                  alt="Students climbing toward internship goal"
                  className="relative w-auto object-contain object-center mix-blend-multiply select-none"
                  style={{ height: "90%" }}
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {(() => {
          const testimonials = [
            {
              name: "Chintada Pavan Surya",
              yog: "YOG 2027",
              initials: "CP",
              color: "bg-accent",
              role: "AI Automation Engineer · Django Developer · SDE",
              company: "Scomedia, Playto & Bellcorp Studio",
              stipend: "₹10K–₹15K/month",
              stipendColor: "bg-accent",
              quote: "The placement team provided excellent support and answered doubts multiple times. Start from Day 1, be active on GitHub — interviewers check your profile. Projects speak louder than any other credential. Build consistently and understand core functionality clearly.",
              advice: ["Start working from Day 1", "Be active on GitHub", "Build projects consistently"],
            },
            {
              name: "Malaya Kumar Pradhan",
              yog: "YOG 2027",
              initials: "MK",
              color: "bg-teal-500",
              role: "MERN Intern",
              company: "Chirpn IT Solutions",
              stipend: "₹5K–₹10K/month",
              stipendColor: "bg-teal-500",
              quote: "The process was challenging and required strong coding preparation. Use AI for learning, not for coding for you. Software development is about solving problems under pressure and understanding system architecture. Learn from every rejection and keep improving.",
              advice: ["Strengthen coding skills", "Use AI to learn, not to code", "Learn from every rejection"],
            },
            {
              name: "Abhay Soni",
              yog: "YOG 2027",
              initials: "AS",
              color: "bg-violet-500",
              role: "Associate Engineer",
              company: "Bellcorp Studio",
              stipend: "₹5K–₹10K/month",
              stipendColor: "bg-violet-500",
              quote: "Started with building a movie ticket booking system, followed by interviews. Learned real-world collaboration, debugging, structured API integration, and software development practices. Focus on strong fundamentals and don't get overwhelmed by too many technologies.",
              advice: ["Focus on strong fundamentals", "Build practical projects", "Stay patient and consistent"],
            },
            {
              name: "Ashlesh Bathina",
              yog: "YOG 2027",
              initials: "AB",
              color: "bg-orange-500",
              role: "Software Developer Intern",
              company: "2xCabs",
              stipend: "₹5K–₹10K/month",
              stipendColor: "bg-orange-500",
              quote: "Revised JavaScript and MERN fundamentals before the rounds. Improved technical understanding, confidence, communication, and problem-solving skills. The internship provided real-world exposure. Start early — preparation makes you industry-ready.",
              advice: ["Start early", "Focus on DSA, DBMS, OOPs", "Practice problem solving"],
            },
            {
              name: "Yelkur Pujitha",
              yog: "YOG 2027",
              initials: "YP",
              color: "bg-pink-500",
              role: "Associate Software Engineer",
              company: "Bellcorp Studio",
              stipend: "₹10K–₹15K/month",
              stipendColor: "bg-pink-500",
              quote: "Transitioned from academic projects to production-level development. Worked on authentication, API integrations, React, MongoDB, and REST APIs. Consistency matters more than perfection — use GitHub and LinkedIn effectively and learn from every mistake.",
              advice: ["Build consistently", "Use GitHub & LinkedIn", "Consistency over perfection"],
            },
          ];
          return (
            <section className="py-20 bg-blue-50/60">
              <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-accent inline-block">Students Who Made It</h2>
                  <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-accent" />
                  <p className="text-muted-foreground mt-4 text-base">Real stories from NxtWave students who cleared IRP and landed internships.</p>
                </div>

                <div className="relative">
                  <button onClick={() => scrollTestimonials("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div ref={testimonialsRef} className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
                  {testimonials.map((t, i) => (
                    <div key={i} className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow p-6 gap-4 shrink-0 w-[300px] snap-start">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm shrink-0`}>{t.initials}</div>
                          <div>
                            <p className="font-bold text-sm text-foreground leading-tight">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.yog}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <span className="text-accent font-serif text-xl leading-none font-bold">"</span>
                        </div>
                      </div>
                      {/* Quote */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                      {/* Advice pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {t.advice.map((a, j) => (
                          <span key={j} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-700">{t.company}</span>
                        <span className={`text-xs font-bold text-white ${t.stipendColor} px-2.5 py-1 rounded-full`}>{t.stipend}</span>
                      </div>
                    </div>
                  ))}
                  </div>
                  <button onClick={() => scrollTestimonials("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
          );
        })()}

        {/* About Section */}
        <section id="about" className="py-16 bg-gradient-to-b from-blue-50 via-indigo-50/40 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">

            {/* Two-column header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="flex-[3]">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-blue-700">What is IRP 2.0?</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center md:text-left">
                  IRP 2.0 is NxtWave Academy's structured program to help 1st and 2nd year students prepare for and access internship opportunities. It's built specifically for you — the assessments, projects, and interviews are all scoped to what you've studied at your current year level.
                </p>
              </div>
              <div className="flex-[2] flex items-center justify-center">
                <img
                  src="/about-student.png"
                  alt="Student with laptop illustration"
                  className="w-full max-w-[220px] md:max-w-[260px] object-contain mix-blend-multiply select-none"
                />
              </div>
            </div>

            {/* Before / Now cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border border-border text-foreground shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-2 pt-6 px-6">
                  <Badge variant="outline" className="w-fit mb-3 text-red-500 border-red-200 bg-red-50 text-xs font-semibold">Before</Badge>
                  <CardTitle className="text-2xl font-bold">The old IRP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-6 pb-6">
                  {[
                    "Assessed alongside 3rd, 4th & final year students",
                    "Common assessments regardless of year",
                    "Online + Offline rounds (travel required)",
                    "One-size-fits-all process",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white border border-accent/20 text-foreground shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-2 pt-6 px-6">
                  <Badge variant="outline" className="w-fit mb-3 text-accent border-accent/30 bg-accent/5 text-xs font-semibold">Now</Badge>
                  <CardTitle className="text-2xl font-bold">IRP 2.0</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-6 pb-6">
                  {[
                    "Tailored assessments — only what you've studied",
                    "Year-level appropriate content",
                    "100% Online — attempt from anywhere",
                    "Multi-level structure with progressive unlocks",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        {/* Levels Section */}
        <section id="levels" className="py-20 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-accent to-indigo-500">The Three Levels</h2>
              <p className="text-base text-muted-foreground">Progress through the ranks to unlock top opportunities.</p>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch gap-0">

              {/* Level 1 */}
              <motion.div className="flex-1 flex flex-col"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <Card className="flex-1 flex flex-col rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                  {/* Icon header */}
                  <div className="flex flex-col items-center pt-8 pb-4 px-6">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <User className="h-7 w-7 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Level 1</Badge>
                      <span className="text-xs text-muted-foreground font-medium">14 June 2026</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-center">The Hustler</CardTitle>
                  </div>
                  <CardContent className="flex-1 text-sm flex flex-col gap-5 px-6 pb-4">
                    <div className="min-h-[160px]">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><FileCode2 className="h-3.5 w-3.5" /> Assessment Format (2 hrs total)</h4>
                      <ul className="space-y-2.5">
                        <li><p className="font-medium text-foreground text-sm">Python + DSA</p><p className="text-muted-foreground text-xs">MCQ • 90 mins • 40 Qs</p></li>
                        <li><p className="font-medium text-foreground text-sm">Frontend (HTML, CSS, JS, React)</p><p className="text-muted-foreground text-xs">MCQ • 30 mins • 30 Qs</p></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><User className="h-3.5 w-3.5" /> Post-Assessment</h4>
                      <ul className="space-y-1.5 text-muted-foreground text-sm">
                        {["FE Project Build (12 hrs)", "AI Mock Interview (1 hr)", "Human Mock Interview (1 hr)"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-blue-50/60 border-t border-blue-100 px-6 py-3 mt-auto">
                    <p className="text-xs font-semibold text-blue-700 flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Unlocks Eligibility for Level 2</p>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Arrow connector */}
              <div className="hidden lg:flex items-center justify-center px-2 shrink-0">
                <ArrowRight className="h-6 w-6 text-slate-300" />
              </div>

              {/* Level 2 */}
              <motion.div className="flex-1 flex flex-col"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Card className="flex-1 flex flex-col rounded-2xl border border-accent/30 shadow-md shadow-accent/10 bg-white overflow-hidden">
                  <div className="flex flex-col items-center pt-8 pb-4 px-6">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                      <span className="text-accent font-bold text-base font-mono">&lt;/&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs">Level 2</Badge>
                      <Badge className="bg-accent text-white border-none text-xs px-2 py-0">Crucial Stage</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-center">The Main Character</CardTitle>
                  </div>
                  <CardContent className="flex-1 text-sm flex flex-col gap-5 px-6 pb-4">
                    <div className="min-h-[160px]">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><Server className="h-3.5 w-3.5" /> Assessment Format (1 hr total)</h4>
                      <ul className="space-y-2.5">
                        <li><p className="font-medium text-foreground text-sm">Backend (NodeJS + Express)</p><p className="text-muted-foreground text-xs">MCQ • 20 mins • 20 Qs</p></li>
                        <li><p className="font-medium text-foreground text-sm">Database (SQL, NoSQL, Mongo)</p><p className="text-muted-foreground text-xs">MCQ • 20 mins • 20 Qs</p></li>
                        <li><p className="font-medium text-foreground text-sm">GenAI</p><p className="text-muted-foreground text-xs">MCQ • 20 mins • 20 Qs</p></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><User className="h-3.5 w-3.5" /> Post-Assessment</h4>
                      <ul className="space-y-1.5 text-muted-foreground text-sm">
                        {["Full Stack + AI Project (24 hrs)", "AI Mock Interview (1 hr)", "Human Mock Interview (1 hr)"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-accent/5 border-t border-accent/10 px-6 py-3 mt-auto">
                    <p className="text-xs font-bold text-accent flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5" /> Unlocks Internships (₹5K–₹15K)</p>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Arrow connector */}
              <div className="hidden lg:flex items-center justify-center px-2 shrink-0">
                <ArrowRight className="h-6 w-6 text-slate-300" />
              </div>

              {/* Level 3 */}
              <motion.div className="flex-1 flex flex-col"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                <Card className="flex-1 flex flex-col rounded-2xl border border-purple-200 shadow-sm bg-white overflow-hidden">
                  <div className="flex flex-col items-center pt-8 pb-4 px-6">
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <Trophy className="h-7 w-7 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">Level 3</Badge>
                      <span className="text-xs font-semibold text-purple-500">Curated Track</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">Infinite Aura</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1 text-center">Unlocks after clearing BOTH L1 &amp; L2.</p>
                  </div>
                  <CardContent className="flex-1 text-sm flex flex-col gap-5 px-6 pb-4">
                    <div className="min-h-[160px]">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><Trophy className="h-3.5 w-3.5 text-purple-500" /> How to Qualify</h4>
                      <ul className="space-y-2.5">
                        <li><p className="font-medium text-foreground text-sm">Clear Level 1 + Level 2</p><p className="text-muted-foreground text-xs">Pass both assessments &amp; projects</p></li>
                        <li><p className="font-medium text-foreground text-sm">AI + Human Mock Interview</p><p className="text-muted-foreground text-xs">At each level • 1 hr each</p></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><Star className="h-3.5 w-3.5 text-purple-500" /> Exclusive Benefits</h4>
                      <ul className="space-y-1.5">
                        {[
                          { Icon: Trophy, title: "₹25K+ Stipend Internships", sub: "Access to premium opportunities" },
                          { Icon: User, title: "Elite Mentorship", sub: "Mentors from Microsoft, Apple, Google" },
                          { Icon: CheckCircle2, title: "Founding Team Access", sub: "Interact with NxtWave leadership" },
                        ].map(({ Icon, title, sub }, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="bg-purple-100 p-1 rounded-md shrink-0 mt-0.5"><Icon className="h-3 w-3 text-purple-600" /></div>
                            <div><p className="font-medium text-foreground text-xs">{title}</p><p className="text-muted-foreground text-xs">{sub}</p></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-purple-50/60 border-t border-purple-100 px-6 py-3 mt-auto">
                    <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }} className="text-xs font-medium text-purple-700 flex items-center gap-1.5 hover:underline">
                      <Trophy className="h-3.5 w-3.5" /> See Infinite Aura eligibility →
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Courses Section — Path Layout */}
        <section id="courses" className="py-20 bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-accent">Your Learning Path</h2>
              <p className="text-muted-foreground">Courses to complete on the NxtWave platform — click any course to open it directly.</p>
            </div>

            {/* Path */}
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-purple-500 z-0" />

              {/* LEVEL 1 */}
              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center font-black text-xs md:text-sm shrink-0 shadow-lg ring-4 ring-blue-100">
                    <span className="leading-none">L1</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Level 1</span>
                    <h3 className="text-lg font-bold text-foreground">The Hustler</h3>
                  </div>
                </div>
                <div className="ml-16 md:ml-24 grid md:grid-cols-2 gap-4">
                  {/* FE Track */}
                  <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                    <div className="bg-blue-600 px-4 py-2.5 flex items-center gap-2">
                      <Code className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">Frontend Track</span>
                    </div>
                    <ul className="divide-y divide-blue-50">
                      {[
                        { name: "Build your own Static Website", url: "https://learning.ccbp.in/cl-course/6d41f350-76d5-4337-9be0-3fe0b26b1b26" },
                        { name: "Build your own Responsive Website", url: "https://learning.ccbp.in/cl-course/62e43c70-ee74-4afe-8d1c-26ca9c22947a" },
                        { name: "Modern Responsive Web Design", url: "https://learning.ccbp.in/cl-course/1d571a66-be1e-49cd-a17f-5b3b22d6d751" },
                        { name: "Build your own Dynamic Web App", url: "https://learning.ccbp.in/cl-course/c0d9b357-87a7-41e2-985f-affaef636499" },
                        { name: "JS Essentials", url: "https://learning.ccbp.in/cl-course/7e0446da-981d-4faa-b02d-f4dc605dba66" },
                        { name: "Introduction to React JS", url: "https://learning.ccbp.in/cl-course/40ab5ebd-3def-4faf-adca-3d39d921df1c" },
                      ].map((c, i) => (
                        <li key={i}>
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-blue-50 transition-colors group">
                            <span className="text-sm font-medium text-foreground group-hover:text-blue-700 transition-colors">{c.name}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-blue-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Coding Track */}
                  <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                    <div className="bg-blue-500 px-4 py-2.5 flex items-center gap-2">
                      <Code className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">Coding Track</span>
                    </div>
                    <ul className="divide-y divide-blue-50">
                      {[
                        { name: "Programming Foundations", url: "https://learning.ccbp.in/cl-course/c6008f8d-cd91-4843-bb3f-b75d4beca046" },
                        { name: "Data Structures & Algorithms — Level 1", url: "https://learning.ccbp.in/course?c_id=058b97cb-16db-4098-8b1e-3e7cbffe1db4" },
                      ].map((c, i) => (
                        <li key={i}>
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-blue-50 transition-colors group">
                            <span className="text-sm font-medium text-foreground group-hover:text-blue-700 transition-colors">{c.name}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-blue-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Unlock arrow */}
              <div className="ml-16 md:ml-24 mb-6 flex items-center gap-2 text-xs font-semibold text-blue-500">
                <ArrowRight className="h-4 w-4" />
                Clear Level 1 to unlock Level 2
              </div>

              {/* LEVEL 2 */}
              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent text-white flex flex-col items-center justify-center font-black text-xs md:text-sm shrink-0 shadow-lg ring-4 ring-accent/20">
                    <span className="leading-none">L2</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Level 2</span>
                    <h3 className="text-lg font-bold text-foreground">The Main Character</h3>
                  </div>
                </div>
                <div className="ml-16 md:ml-24 grid md:grid-cols-2 gap-4">
                  {/* Backend Track */}
                  <div className="bg-white rounded-xl border border-accent/20 shadow-sm overflow-hidden">
                    <div className="bg-accent px-4 py-2.5 flex items-center gap-2">
                      <Database className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">Backend Track</span>
                    </div>
                    <ul className="divide-y divide-blue-50">
                      {[
                        { name: "Introduction to Databases", url: "https://learning.ccbp.in/cl-course/25c1a72c-216e-47e1-9bc6-b2f16c66e0ca" },
                        { name: "DBMS", url: "https://learning.ccbp.in/course?c_id=3ba04d30-7c3a-4d5d-8c23-6e3bfc093511" },
                        { name: "Node JS", url: "https://learning.ccbp.in/cl-course/d82d6905-6694-42c4-8c0c-bd2c887c1b53" },
                        { name: "MongoDB", url: "https://learning.ccbp.in/course?c_id=a5777f9b-1a9c-42a5-aab7-0182e80efca2&s_id=f09a898b-f8e3-4ded-a6c7-46184629ff3d&t_id=42d9584b-aee6-4eb6-b1ed-8f8de7a29633" },
                      ].map((c, i) => (
                        <li key={i}>
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-blue-50 transition-colors group">
                            <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{c.name}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-accent/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Generative AI Track */}
                  <div className="bg-white rounded-xl border border-accent/20 shadow-sm overflow-hidden">
                    <div className="bg-accent px-4 py-2.5 flex items-center gap-2">
                      <Star className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">Generative AI Track</span>
                    </div>
                    <ul className="divide-y divide-blue-50">
                      {[
                        { name: "Generative AI", url: "https://learning.ccbp.in/course?c_id=b9811b34-585b-47e0-a0be-65f1081a74f2&s_id=64025833-d46d-4e7c-a7e0-a9c230a78b9d&t_id=096cf0ff-cdc5-4efb-9895-7c9aff0dbb1e" },
                      ].map((c, i) => (
                        <li key={i}>
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-blue-50 transition-colors group">
                            <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{c.name}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-accent/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Unlock arrow */}
              <div className="ml-16 md:ml-24 mb-6 flex items-center gap-2 text-xs font-semibold text-purple-500">
                <ArrowRight className="h-4 w-4" />
                Clear Level 1 + Level 2 to unlock Level 3
              </div>

              {/* LEVEL 3 */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-600 text-white flex flex-col items-center justify-center font-black text-xs md:text-sm shrink-0 shadow-lg ring-4 ring-purple-100">
                    <span className="leading-none">L3</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-600">Level 3</span>
                    <h3 className="text-lg font-bold text-foreground">Infinite Aura — Top 1%</h3>
                  </div>
                </div>
                <div className="ml-16 md:ml-24">
                  <div className="bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
                    <div className="bg-purple-600 px-4 py-2.5 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">Advanced DSA Track</span>
                    </div>
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-purple-100">
                      {/* Left — NxtWave DSA Courses */}
                      <div>
                        <p className="px-4 pt-2.5 pb-1 text-xs font-semibold text-purple-500 uppercase tracking-wide">NxtWave Courses</p>
                        <ul className="divide-y divide-purple-50">
                          {[
                            { name: "DSA — Level 2", url: "https://learning.ccbp.in/course?c_id=229cbe49-f4c4-4aa2-bcc6-55ea3e15e159" },
                            { name: "DSA — Level 3", url: "https://learning.ccbp.in/course?c_id=68d141a9-3a73-4bc3-8d8c-cfff7ec8a4be&s_id=696cf715-22e7-4587-ac63-6c5df7427ad5&t_id=009e5ade-f694-4a42-8dbf-544f06a4da1e" },
                          ].map((c, i) => (
                            <li key={i}>
                              <a href={c.url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-purple-50 transition-colors group">
                                <span className="text-sm font-medium text-foreground group-hover:text-purple-700 transition-colors">{c.name}</span>
                                <ExternalLink className="h-3.5 w-3.5 text-purple-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Right — Practice Platforms */}
                      <div>
                        <p className="px-4 pt-2.5 pb-1 text-xs font-semibold text-purple-500 uppercase tracking-wide">Practice Platforms</p>
                        <ul className="divide-y divide-purple-50">
                          {[
                            { name: "LeetCode", url: "https://leetcode.com" },
                            { name: "CodeChef", url: "https://www.codechef.com" },
                          ].map((c, i) => (
                            <li key={i}>
                              <a href={c.url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-purple-50 transition-colors group">
                                <span className="text-sm font-medium text-foreground group-hover:text-purple-700 transition-colors">{c.name}</span>
                                <ExternalLink className="h-3.5 w-3.5 text-purple-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-purple-50/60 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-purple-500 shrink-0" />
                      <p className="text-xs text-purple-700 font-medium">Unlocks ₹25K+ stipend internships + elite mentorship from Microsoft, Apple, Google & Salesforce</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section id="checklist" className="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-accent inline-block">Pre-Assessment Checklist</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-accent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {(
                [
                  {
                    num: "01",
                    title: "Study & Revision",
                    detail: "From: DSA basics, HTML, CSS, JS, OOP — all your core concepts.",
                    gradient: "from-blue-500 to-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    num: "02",
                    title: "Practice Regularly",
                    detail: "Solve problems on the NxtWave platform every day. Consistency beats cramming.",
                    gradient: "from-teal-400 to-emerald-500",
                    bg: "bg-teal-50",
                  },
                  {
                    num: "03",
                    title: "Complete Pending Courses",
                    detail: "All incomplete courses for your level must be done before assessment.",
                    gradient: "from-orange-400 to-amber-500",
                    bg: "bg-orange-50",
                  },
                  {
                    num: "04",
                    title: "Submit Your NOC",
                    detail: "Once you clear the assessment round(s), you will be required to submit a valid NOC before you can proceed to accept any internship opportunity.",
                    gradient: "from-violet-500 to-purple-600",
                    bg: "bg-violet-50",
                  },
                ] as { num: string; title: string; detail: React.ReactNode; gradient: string; bg: string }[]
              ).map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-lg">{item.num}</span>
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-base text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-accent">Eligibility & Registration</h2>
              <p className="text-lg text-muted-foreground">Exclusively for YOG 2028 and YOG 2029 students.</p>
            </div>

            <Alert variant="default" className="mb-10 border-accent/50 bg-accent/10">
              <Info className="h-5 w-5 text-accent" />
              <AlertTitle className="text-accent font-bold text-lg mb-2">Important Notice</AlertTitle>
              <AlertDescription className="text-foreground/90 font-medium leading-relaxed">
                Completing Level 1 alone does not make you eligible for internship opportunities. Internship opportunities unlock only after clearing both Level 1 AND Level 2. Students aiming for ₹25K+ stipend internships must additionally qualify for Level 3 — the Infinite Aura track.
              </AlertDescription>
            </Alert>

            {/* Registration Steps */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4 p-5 rounded-xl bg-white border border-border shadow-sm">
                <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0 text-sm">1</div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Complete Internship Profile Registration</p>
                  <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-lg transition-colors">
                    Open Registration Form <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl bg-white border border-border shadow-sm">
                <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0 text-sm">2</div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Watch your email for updates</p>
                  <p className="text-sm text-muted-foreground">Assessment schedules, preparation resources, and result communications will all come through email.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm px-8 py-2.5 rounded-full shadow-md shadow-accent/20">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="pt-8 pb-8 bg-gradient-to-b from-white via-slate-50/60 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-700 to-accent">All Your IRP 2.0 Questions — Answered Here</h2>
            </div>

            <Card className="bg-card text-card-foreground">
              <CardContent className="pt-6">
                <div className="flex justify-end gap-3 mb-4 text-sm">
                  <button onClick={() => setFaqValues(allFaqItems)} className="text-accent hover:underline font-medium">Expand all</button>
                  <span className="text-muted-foreground">·</span>
                  <button onClick={() => setFaqValues([])} className="text-muted-foreground hover:text-foreground hover:underline">Collapse all</button>
                </div>
                <Accordion type="multiple" value={faqValues} onValueChange={setFaqValues} className="w-full">

                  <div className="mb-4"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Eligibility & Who Can Participate</h3></div>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-medium">Is IRP 2.0 for all students or only 1st and 2nd year students?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">IRP 2.0 is exclusively for YOG 2028 and YOG 2029 students — that's 1st and 2nd year students. If you recently completed your 2nd year, you are still eligible. If you are YOG 2027 or earlier, please connect with our Help Section for the appropriate process.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-medium">I just completed my 2nd year. Am I eligible?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. YOG 2028 students who have just completed their 2nd year are eligible to participate in IRP 2.0.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-medium">Are Smart Program students eligible?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">If you are a YOG 2028 or 2029 student under the Smart Program, please connect with our Help Section — eligibility is determined by YOG, not program type.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3b">
                    <AccordionTrigger className="text-left font-medium">What is the minimum course completion required to be eligible?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">There is no fixed percentage threshold for eligibility to register. However, you are expected to have completed the courses relevant to the level you are appearing for before the assessment date.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Assessment Process & Structure</h3></div>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-medium">Does clearing Level 1 make me eligible for internship opportunities?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">No. Clearing Level 1 alone does not make you eligible for internships. Internship opportunities unlock only after you clear both Level 1 and Level 2. Once you clear both, you become eligible for standard opportunities (₹5K–₹10K stipend range). If you are aiming for ₹25K+ stipend internships, you will additionally need to qualify for Level 3 — the Infinite Aura track.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-medium">What happens if I clear Level 1 but fail Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">You will not be eligible for internship opportunities until you clear Level 2 as well. Details on retake windows will be communicated separately. Reattempt for Level 2 and its timeline will be communicated whenever Level 2 reattempt happens.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left font-medium">Are all assessments online?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. All rounds under IRP 2.0 — MCQs, projects, AI Mock Interview, and Human Mock Interview — are 100% online. There are no offline rounds.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left font-medium">Will the assessment on 14th June be online?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes, the 14th June assessment (Level 1) is fully online.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7b">
                    <AccordionTrigger className="text-left font-medium">Is there a deadline to complete all three levels?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Specific deadlines will be communicated at each stage.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7c">
                    <AccordionTrigger className="text-left font-medium">Will there be a second attempt if I miss or fail the June 14th assessment?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Details on retake opportunities will be shared after Summer Batch 1. We will inform on the upcoming batch details soon thereafter. Watch your registered email for updates.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Skills & Preparation</h3></div>
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left font-medium">What skills do I need for Level 1?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">You need: Python (fundamentals), DSA Level 1, HTML, CSS, JavaScript (Essentials), React (Getting Started). These map directly to the NxtWave courses listed in the Level 1 section above.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-left font-medium">Is DSA Level 1 enough for the Python + DSA section?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Level 1 covers DSA at a basic level — DSA Level 1 from the NxtWave platform is sufficient.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-left font-medium">Should I learn DSA in Python or Java?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">The assessment default language is Python, and the DSA section is assessed in Python. You can also code in C++ or Java, but Python is recommended for alignment with the course content.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10b">
                    <AccordionTrigger className="text-left font-medium">Is GenAI mandatory for Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. GenAI is one of the three MCQ sections in Level 2 and will also be used extensively in your Projects for each level, alongside Backend (NodeJS + Express) and Databases.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10c">
                    <AccordionTrigger className="text-left font-medium">Is HTML, CSS, and JavaScript enough for Level 1, or do I need more?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">For Level 1, you need HTML, CSS, JavaScript Essentials, and React — all covered in the NxtWave curriculum. That is the scope of the FE MCQ section.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10d">
                    <AccordionTrigger className="text-left font-medium">Should I learn skills in parallel or one at a time?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Complete courses in the order prescribed in your NxtWave learning path. For Level 1 preparation, prioritize completing the FE courses and DSA Level 1 first.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10e">
                    <AccordionTrigger className="text-left font-medium">Does communication matter in the interview?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. The Human Mock Interview evaluates not just your technical output but also how well you can explain your project and reasoning. Basic clear communication in English is important.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10f">
                    <AccordionTrigger className="text-left font-medium">What if my English communication is not strong?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">The Mock Interviews will assess you based on your project and problem-solving ability. Focus on explaining your thought process clearly — fluency is not the primary criteria.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Projects</h3></div>
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-left font-medium">Will there be a real project in IRP 2.0?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Both levels involve a project submission: a Frontend Project in Level 1 (12 hours) and a Full Stack + AI Project in Level 2 (24 hours).</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-11b">
                    <AccordionTrigger className="text-left font-medium">Do I actually get valuable experience through internships or is it just for certificates?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">NxtWave internship opportunities involve real project work at partner companies. You will gain hands-on experience with actual development tasks — not just certificates. Past students have worked on real products and received stipends.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-11c">
                    <AccordionTrigger className="text-left font-medium">Are remote internships valuable — or will I miss out by not working in-person?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Remote internships through NxtWave involve real deliverables and mentorship. The experience is comparable to in-person internships in terms of learning. You will work on actual company projects.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Stipend & Internship Opportunities</h3></div>
                  <AccordionItem value="item-12">
                    <AccordionTrigger className="text-left font-medium">Are the internships paid?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Level 2 clearance gives access to internships in the ₹5K–₹10K/month stipend range. Level 3 (Infinite Aura track) gives access to ₹25K+ stipend opportunities.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-13">
                    <AccordionTrigger className="text-left font-medium">If I clear both Level 1 and Level 2, what stipend can I expect?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Stipends vary by company and role. After clearing both levels, you become eligible for opportunities typically in the ₹5K–₹10K/month range. Top performers who reach Level 3 status can access ₹25K+ opportunities.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-13b">
                    <AccordionTrigger className="text-left font-medium">Are there internships for specific domains like Data Analytics, AI/ML, or Cybersecurity?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">IRP 2.0 is focused on Full Stack and Frontend development opportunities. Internships in specific domains like Data Analytics or AI/ML may be available through separate channels.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-14">
                    <AccordionTrigger className="text-left font-medium">How long are the internships?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Internship duration varies by company and role. Typical duration is 3–6 months. Specific details will be shared when opportunities are released.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-15">
                    <AccordionTrigger className="text-left font-medium">Will internships be remote or in-office?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Both options may be available depending on the company. Most opportunities in the current batch are remote or hybrid.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-15b">
                    <AccordionTrigger className="text-left font-medium">How many hours per day is expected during an internship?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">This varies by company. Most internships under IRP have structured working hours similar to a full-time engagement (5–6 days a week; 9 hours a day). Hence getting an NOC from your college authorities is mandatory.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Registration & NOC</h3></div>
                  <AccordionItem value="item-16">
                    <AccordionTrigger className="text-left font-medium">How do I register for the assessment?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Complete your Internship Profile Registration here. Link will be updated soon!</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-16b">
                    <AccordionTrigger className="text-left font-medium">Should I submit the form once or multiple times?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Submit the registration form only once. If you are registering for Level 1, select Level 1 in the form. You do not need to resubmit for the same level.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17">
                    <AccordionTrigger className="text-left font-medium">Can I choose Level 1 now and also appear for Level 2 later?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. You will register for Level 1 first. Once Level 1 is cleared, you will register for Level 2 separately.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17b">
                    <AccordionTrigger className="text-left font-medium">What is an NOC and why is it required?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">A No Objection Certificate (NOC) is an official letter from your college stating that they have no objection to you pursuing an internship while enrolled as a student. Most internship opportunities shared through IRP 2.0 are full-time commitments — students are expected to work 5–6 days a week, up to 9 hours a day. Since this runs alongside your college schedule, companies require confirmation from your institution that they are aware of and have no objection to your participation.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17c">
                    <AccordionTrigger className="text-left font-medium">Is NOC mandatory?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. A No Objection Certificate from your college is required to participate in internship opportunities. This is separate from the assessment registration — you need both.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17d">
                    <AccordionTrigger className="text-left font-medium">I haven't submitted my NOC yet. Can I still appear for the assessment?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">You can appear for the assessment without the NOC. However, the NOC is required to actually access and accept internship opportunities. Submit it as early as possible.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Where Opportunities Are Displayed</h3></div>
                  <AccordionItem value="item-18">
                    <AccordionTrigger className="text-left font-medium">Where will internship opportunities be shown after I clear the levels?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Internship opportunities will be displayed on the IRP 2.0 page — this will be your single destination for viewing and applying to opportunities. The Jobs Board used previously will not be used for IRP 2.0 opportunities.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-18b">
                    <AccordionTrigger className="text-left font-medium">When will internship opportunities start appearing?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Opportunities will be made available after students have completed the Level 1 and Level 2 assessments and results are processed. Watch your email for updates.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Courses & Platform</h3></div>
                  <AccordionItem value="item-19">
                    <AccordionTrigger className="text-left font-medium">Where do I find the courses I need to study?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">All courses are available in your NxtWave Learning Portal. The course names mapped to Level 1 and Level 2 are listed in the "Courses to Prepare" section above.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-20">
                    <AccordionTrigger className="text-left font-medium">Will a preparation roadmap be provided?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Preparation guidance will be shared through email and our Guidance Meets. The IRP 2.0 page will also have course mapping details.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-20b">
                    <AccordionTrigger className="text-left font-medium">Does completing IRP contribute to Growth Cycle progress?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">IRP assessments and Growth Cycles are separate tracks. Completing courses in your Growth Cycle is important for IRP preparation, but IRP completion itself does not directly increment Growth Cycle progress.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-20c">
                    <AccordionTrigger className="text-left font-medium">Can I use VS Code or other tools for the project rounds?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. You can use your preferred IDE (VS Code, etc.) for the project rounds. The submission format will be specified when the project brief is shared.</AccordionContent>
                  </AccordionItem>

                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact & Help Section */}
        <section className="pt-4 pb-10 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">Contact & Help</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5">For assistance regarding the Placement Journey, students can:</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: User,
                      title: "Success Coach",
                      desc: "Contact your assigned Success Coach for personalized guidance.",
                      link: null,
                      linkLabel: null,
                      sub: null,
                    },
                    {
                      icon: BookOpen,
                      title: "Help Desk",
                      desc: "Reach out to Help Desk for any placement-related queries.",
                      link: null,
                      linkLabel: null,
                      sub: null,
                    },
                    {
                      icon: CheckCircle2,
                      title: "Email Support",
                      desc: null,
                      link: "mailto:support@nxtwave.tech",
                      linkLabel: "support@nxtwave.tech",
                      sub: null,
                    },
                  ].map(({ icon: Icon, title, desc, link, linkLabel }, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground mb-0.5">{title}</p>
                        {desc && <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>}
                        {link && <a href={link} className="text-xs text-accent underline underline-offset-2 hover:text-accent/80">{linkLabel}</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="bg-slate-900 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center">
              <img src="/nxtwave-academy-logo.png" alt="NxtWave Academy" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-400 font-medium">
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
              <button onClick={() => document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Levels</button>
              <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Courses</button>
              <button onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Checklist</button>
              <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">FAQ</button>
            </div>
            <button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="bg-accent text-white text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-accent/90 transition-colors">
              Register Now
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="flex items-center gap-2 text-slate-400">
              <Navigation className="h-4 w-4 text-accent" />
              Reach your Success Coach for support
            </p>
            <p className="text-slate-500">
              © {new Date().getFullYear()} NxtWave Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
