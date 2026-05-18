import React, { useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, BookOpen, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, Code, 
  Database, ExternalLink, FileCode2, FileText, Info, Menu, Rocket, Server, Star, Terminal, Trophy, 
  User, CheckCircle, Navigation, X
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
  const allFaqItems = ["item-1","item-2","item-3","item-3b","item-4","item-5","item-6","item-7","item-7b","item-7c","item-8","item-9","item-10","item-10b","item-10c","item-10d","item-10e","item-10f","item-11","item-11b","item-11c","item-12","item-13","item-13b","item-14","item-15","item-15b","item-17b","item-18","item-18b","item-19","item-20","item-20b","item-20c"];
  const allCategoryIds = ["eligibility","assessment","skills","projects","stipend","noc","opportunities","courses"];
  const [faqValues, setFaqValues] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const toggleCategory = (id: string) => setOpenCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

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
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 h-[480px] md:h-[540px]">
          {/* Mesh grid overlay */}
          <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.8) 1px,transparent 0)',backgroundSize:'32px 32px'}} />
          {/* Glow blobs */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-accent/10 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl px-6 md:px-10 h-full">
            <div className="flex flex-row items-stretch h-full gap-0">

              {/* Left — text, centred vertically */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-[55_55_0%] flex flex-col justify-center py-8 pr-0 md:pr-6"
              >
                <div className="flex flex-row items-center gap-2 mb-5 flex-wrap">
                  <Badge className="bg-white/15 text-white border border-white/25 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap">
                    ✦ Summer 2026 IRP 2.0 Batch — Open Now!
                  </Badge>
                  <Badge className="bg-blue-400/20 text-blue-200 border border-blue-400/30 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap">
                    First Assessment: 14th June 2026
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-[1.1] text-white">
                  Internship Readiness
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">Path 2.0</span>
                </h1>

                <p className="text-base md:text-lg text-blue-100/75 mb-7 max-w-md leading-relaxed">
                  Built exclusively for 1st &amp; 2nd Year Students (YOG 2028 &amp; 2029).
                  Earn your first stipend internship through NxtWave Academy's structured assessments and tailored path!
                </p>

                <div className="flex flex-row gap-3 flex-wrap">
                  <Button className="bg-white text-blue-900 hover:bg-blue-50 text-sm px-6 py-2.5 rounded-full shadow-xl font-bold" onClick={() => scrollTo('register')}>
                    Register for IRP 2.0 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-sm px-5 py-2.5 rounded-full" onClick={() => scrollTo('levels')}>
                    View the Path
                  </Button>
                </div>
              </motion.div>

              {/* Right — illustration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex-[45_45_0%] hidden md:flex items-end justify-center relative"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-20 bg-blue-400/20 blur-3xl rounded-full" />
                <img
                  src="/hero-illustration-transparent.png"
                  alt="Students climbing toward internship goal"
                  className="relative w-auto object-contain object-center select-none drop-shadow-2xl"
                  style={{ height: "90%" }}
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-6 bg-white border-b border-slate-100 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { val: "100%", label: "Online — attempt from anywhere" },
                { val: "₹5K–₹25K+", label: "Monthly stipend range" },
                { val: "14 June", label: "First assessment date" },
                { val: "YOG 28/29", label: "Exclusively for you" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 text-center py-2">
                  <span className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-accent">{s.val}</span>
                  <span className="text-xs text-muted-foreground leading-tight max-w-[120px]">{s.label}</span>
                </div>
              ))}
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
                <Card className="flex-1 flex flex-col rounded-2xl border-0 shadow-lg overflow-hidden">
                  {/* Colored header band */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-500 flex flex-col items-center pt-8 pb-6 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'20px 20px'}} />
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 relative">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge className="bg-white/20 text-white border border-white/30 text-xs">Level 1</Badge>
                      <span className="text-xs text-blue-100 font-medium">14 June 2026</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-center text-white">The Hustler</CardTitle>
                  </div>
                  <CardContent className="flex-1 text-sm flex flex-col gap-5 px-6 pb-4">
                    <div className="flex-1">
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
                <Card className="flex-1 flex flex-col rounded-2xl border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-accent to-indigo-500 flex flex-col items-center pt-8 pb-6 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'20px 20px'}} />
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 relative">
                      <span className="text-white font-bold text-base font-mono">&lt;/&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge className="bg-white/20 text-white border border-white/30 text-xs">Level 2</Badge>
                      <Badge className="bg-white text-accent border-none text-xs px-2 py-0 font-bold">Crucial Stage</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-center text-white">The Main Character</CardTitle>
                  </div>
                  <CardContent className="flex-1 text-sm flex flex-col gap-5 px-6 pb-4">
                    <div className="flex-1">
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
                <Card className="flex-1 flex flex-col rounded-2xl border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-700 to-indigo-600 flex flex-col items-center pt-8 pb-6 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'20px 20px'}} />
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 relative">
                      <Trophy className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge className="bg-white/20 text-white border border-white/30 text-xs">Level 3</Badge>
                      <span className="text-xs font-semibold text-purple-200">Curated Track</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-center text-white">Infinite Aura</CardTitle>
                  </div>
                  <CardContent className="flex-1 text-sm flex flex-col gap-5 px-6 pb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><Trophy className="h-3.5 w-3.5 text-purple-500" /> Eligibility Criteria</h4>
                      <ul className="space-y-1.5 text-muted-foreground text-sm">
                        {["Maintain CodeChef Rating", "Maintain LeetCode Rating", "A good rating in both platforms", "Strong Knowledge in DSA"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide border-b pb-2"><Star className="h-3.5 w-3.5 text-purple-500" /> Exclusive Benefits</h4>
                      <ul className="space-y-1.5">
                        {[
                          { Icon: Trophy, title: "₹25K+ Stipend Internships", sub: "Access to premium opportunities" },
                          { Icon: User, title: "Elite Mentorship", sub: "Mentors from Microsoft, Apple, Google" },
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

        {/* Testimonials Section */}
        {(() => {
          const testimonials = [
            {
              name: "Chintada Pavan Surya",
              yog: "YOG 2027",
              initials: "CP",
              img: "/pavan-surya.png",
              color: "bg-accent",
              role: "AI Automation Engineer",
              company: "Scomedia, Playto & Bellcorp Studio",
              stipend: "₹10k – ₹15k",
              duration: "6 months",
              rating: 5,
              quote: "The placement team provided excellent support and answered doubts multiple times. Started working from Day 1, built projects, and kept my GitHub active — that made all the difference!",
            },
            {
              name: "Malaya Kumar Pradhan",
              yog: "YOG 2027",
              initials: "MK",
              img: "/malaya-kumar.png",
              color: "bg-teal-500",
              role: "MERN Intern",
              company: "Chirpn IT Solutions",
              stipend: "₹5k – ₹10k",
              duration: "6 months",
              rating: 4,
              quote: "I improved my MERN skills and learned system design from scratch. This internship taught me that real development is about solving problems and understanding how systems work together.",
            },
            {
              name: "Abhay Soni",
              yog: "YOG 2027",
              initials: "AS",
              img: "/abhay-soni.png",
              color: "bg-violet-500",
              role: "Associate Engineer",
              company: "Bellcorp Studio",
              stipend: "₹5k – ₹10k",
              duration: "6 months",
              rating: 5,
              quote: "Built a movie ticket booking system, worked on admin console, APIs, and MERN stack. Learned how real projects work, how teams collaborate, and how to debug and integrate APIs efficiently.",
            },
            {
              name: "Ashlesh Bathina",
              yog: "YOG 2027",
              initials: "AB",
              img: "/ashlesh-bathina.png",
              color: "bg-orange-500",
              role: "Software Developer Intern",
              company: "2xCabs",
              stipend: "₹5k – ₹10k",
              duration: "6 months",
              rating: 5,
              quote: "The process included TR1 and TR2 + HR rounds. I revised MERN fundamentals and improved my technical knowledge, confidence, and communication. This internship gave me real-world exposure and helped me grow a lot.",
            },
            {
              name: "Yelkur Pujitha",
              yog: "YOG 2027",
              initials: "YP",
              img: "/yelkur-pujitha.png",
              color: "bg-pink-500",
              role: "Associate Software Engineer",
              company: "Bellcorp Studio",
              stipend: "₹10k – ₹15k",
              duration: "6 months",
              rating: 5,
              quote: "Worked on authentication, API integrations, frontend-backend integration with React, MongoDB, and REST APIs. Learned professional workflows, collaboration, and how to adapt in a real-world environment.",
            },
          ];

          const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
            <div className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Colored top accent */}
              <div className={`h-1 w-full ${t.color}`} />
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Large decorative quote */}
                <div className="text-6xl font-serif leading-none text-slate-100 select-none -mb-4 -mt-1">"</div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 relative z-10">{t.quote}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs border-t border-slate-100 pt-3 mt-1">
                  <div className="flex items-center gap-1 whitespace-nowrap bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    <Trophy className="h-3 w-3 shrink-0" />
                    <span className="font-semibold">{t.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1 whitespace-nowrap bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    <Clock className="h-3 w-3 shrink-0" />
                    <span className="font-semibold">{t.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 whitespace-nowrap bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />
                    <span className="font-semibold">{t.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                  {'img' in t && t.img
                    ? <img src={t.img as string} alt={t.name} className="w-11 h-11 rounded-full object-cover object-top shrink-0 shadow-md ring-2 ring-white" />
                    : <div className={`w-11 h-11 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow`}>{t.initials}</div>
                  }
                  <div>
                    <p className="font-bold text-sm text-foreground leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{t.role} · <span className="text-slate-400">{t.company}</span></p>
                    <p className="text-xs font-semibold text-accent mt-0.5">{t.yog}</p>
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <section className="py-20 bg-slate-50">
              <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent mb-3">
                    <Star className="h-3.5 w-3.5 fill-accent" /> Success Stories
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                    Students Who <span className="text-accent">Made It</span>
                  </h2>
                  <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-accent mb-4" />
                  <p className="text-muted-foreground text-base">Real stories from NxtWave students who cleared IRP and landed internships.</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => scrollTestimonials("left")}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div
                    ref={testimonialsRef}
                    className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
                  >
                    {testimonials.map((t, i) => (
                      <div key={i} className="w-[85vw] md:w-[calc((100%-40px)/3)] flex-none snap-start">
                        <TestimonialCard t={t} />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTestimonials("right")}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-3 md:hidden">Swipe to see more →</p>
              </div>
            </section>
          );
        })()}

        {/* Checklist Section */}
        <section id="checklist" className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">Before You Begin</span>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-accent inline-block">Pre-Assessment Checklist</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-accent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {(
                [
                  {
                    num: "01",
                    title: "Study & Revision",
                    detail: "DSA basics, HTML, CSS, JS, OOP — nail your core concepts before the assessment day.",
                    gradient: "from-blue-500 to-blue-600",
                    border: "border-l-blue-400",
                    glow: "bg-blue-50",
                  },
                  {
                    num: "02",
                    title: "Practice Regularly",
                    detail: "Solve problems on the NxtWave platform every day. Consistency beats cramming.",
                    gradient: "from-teal-400 to-emerald-500",
                    border: "border-l-emerald-400",
                    glow: "bg-emerald-50",
                  },
                  {
                    num: "03",
                    title: "Complete Pending Courses",
                    detail: "It is always a good idea to try to finish all the courses for each level before assessment.",
                    gradient: "from-orange-400 to-amber-500",
                    border: "border-l-amber-400",
                    glow: "bg-amber-50",
                  },
                  {
                    num: "04",
                    title: "Build Your Profile",
                    detail: "LinkedIn, GitHub, LeetCode, CodeChef — make sure your profiles are updated and active.",
                    gradient: "from-violet-500 to-purple-600",
                    border: "border-l-violet-400",
                    glow: "bg-violet-50",
                  },
                ] as { num: string; title: string; detail: React.ReactNode; gradient: string; border: string; glow: string }[]
              ).map((item, i) => (
                <div key={i} className={`flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-100 border-l-4 ${item.border} shadow-sm hover:shadow-lg transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-white font-black text-lg">{item.num}</span>
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-base text-foreground mb-1.5">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.8) 1px,transparent 0)',backgroundSize:'32px 32px'}} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Eligibility &amp; Registration</h2>
              <p className="text-lg text-blue-200/70">Exclusively for YOG 2028 and YOG 2029 students.</p>
            </div>

            <Alert variant="default" className="mb-10 border-yellow-400/30 bg-yellow-400/10 backdrop-blur-sm">
              <Info className="h-5 w-5 text-yellow-300" />
              <AlertTitle className="text-yellow-200 font-bold text-lg mb-2">Important Notice</AlertTitle>
              <AlertDescription className="text-yellow-100/80 font-medium leading-relaxed">
                Completing Level 1 alone does not make you eligible for internship opportunities. Internship opportunities unlock only after clearing both Level 1 AND Level 2. Students aiming for ₹25K+ stipend internships must additionally qualify for Level 3 — the Infinite Aura track.
              </AlertDescription>
            </Alert>

            {/* Registration Steps */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-black shrink-0 text-sm">1</div>
                <div>
                  <p className="font-semibold text-white mb-1">Complete Internship Profile Registration</p>
                  <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/20">
                    Open Registration Form <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-black shrink-0 text-sm">2</div>
                <div>
                  <p className="font-semibold text-white mb-1">Watch your email for updates</p>
                  <p className="text-sm text-blue-200/70">Assessment schedules, preparation resources, and result communications will all come through email.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-blue-900 hover:bg-blue-50 text-sm px-10 py-3 rounded-full shadow-2xl font-bold text-base h-auto">
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
                <div className="flex justify-end gap-3 mb-2 text-sm">
                  <button onClick={() => { setOpenCategories(allCategoryIds); setFaqValues(allFaqItems); }} className="text-accent hover:underline font-medium">Expand all</button>
                  <span className="text-muted-foreground">·</span>
                  <button onClick={() => { setOpenCategories([]); setFaqValues([]); }} className="text-muted-foreground hover:text-foreground hover:underline">Collapse all</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {(
                    [
                      {
                        id: "eligibility",
                        title: "Eligibility & Who Can Participate",
                        questions: [
                          { value: "item-1", q: "Is IRP 2.0 for all students or only 1st and 2nd year students?", a: "IRP 2.0 is exclusively for YOG 2028 and YOG 2029 students — that's 1st and 2nd year students. If you recently completed your 2nd year, you are still eligible. If you are YOG 2027 or earlier, please connect with our Help Section for the appropriate process." },
                          { value: "item-2", q: "I just completed my 2nd year. Am I eligible?", a: "Yes. YOG 2028 students who have just completed their 2nd year are eligible to participate in IRP 2.0." },
                          { value: "item-3", q: "Are Smart Program students eligible?", a: "If you are a YOG 2028 or 2029 student under the Smart Program, please connect with our Help Section — eligibility is determined by YOG, not program type." },
                          { value: "item-3b", q: "What is the minimum course completion required to be eligible?", a: "There is no fixed percentage threshold for eligibility to register. However, you are expected to have completed the courses relevant to the level you are appearing for before the assessment date." },
                        ],
                      },
                      {
                        id: "assessment",
                        title: "Assessment Process & Structure",
                        questions: [
                          { value: "item-4", q: "Does clearing Level 1 make me eligible for internship opportunities?", a: "No. Clearing Level 1 alone does not make you eligible for internships. Internship opportunities unlock only after you clear both Level 1 and Level 2. Once you clear both, you become eligible for standard opportunities (₹5K–₹10K stipend range). If you are aiming for ₹25K+ stipend internships, you will additionally need to qualify for Level 3 — the Infinite Aura track." },
                          { value: "item-5", q: "What happens if I clear Level 1 but fail Level 2?", a: "You will not be eligible for internship opportunities until you clear Level 2 as well. Details on retake windows will be communicated separately. Reattempt for Level 2 and its timeline will be communicated whenever Level 2 reattempt happens." },
                          { value: "item-6", q: "Are all assessments online?", a: "Yes. All rounds under IRP 2.0 — MCQs, projects, AI Mock Interview, and Human Mock Interview — are 100% online. There are no offline rounds." },
                          { value: "item-7", q: "Will the assessment on 14th June be online?", a: "Yes, the 14th June assessment (Level 1) is fully online." },
                          { value: "item-7b", q: "Is there a deadline to complete all three levels?", a: "Specific deadlines will be communicated at each stage." },
                          { value: "item-7c", q: "Will there be a second attempt if I miss or fail the June 14th assessment?", a: "Details on retake opportunities will be shared after Summer Batch 1. We will inform on the upcoming batch details soon thereafter. Watch your registered email for updates." },
                        ],
                      },
                      {
                        id: "skills",
                        title: "Skills & Preparation",
                        questions: [
                          { value: "item-8", q: "What skills do I need for Level 1?", a: "You need: Python (fundamentals), DSA Level 1, HTML, CSS, JavaScript (Essentials), React (Getting Started). These map directly to the NxtWave courses listed in the Level 1 section above." },
                          { value: "item-9", q: "Is DSA Level 1 enough for the Python + DSA section?", a: "Yes. Level 1 covers DSA at a basic level — DSA Level 1 from the NxtWave platform is sufficient." },
                          { value: "item-10", q: "Should I learn DSA in Python or Java?", a: "The assessment default language is Python, and the DSA section is assessed in Python. You can also code in C++ or Java, but Python is recommended for alignment with the course content." },
                          { value: "item-10b", q: "Is GenAI mandatory for Level 2?", a: "Yes. GenAI is one of the three MCQ sections in Level 2 and will also be used extensively in your Projects for each level, alongside Backend (NodeJS + Express) and Databases." },
                          { value: "item-10c", q: "Is HTML, CSS, and JavaScript enough for Level 1, or do I need more?", a: "For Level 1, you need HTML, CSS, JavaScript Essentials, and React — all covered in the NxtWave curriculum. That is the scope of the FE MCQ section." },
                          { value: "item-10d", q: "Should I learn skills in parallel or one at a time?", a: "Complete courses in the order prescribed in your NxtWave learning path. For Level 1 preparation, prioritize completing the FE courses and DSA Level 1 first." },
                          { value: "item-10e", q: "Does communication matter in the interview?", a: "Yes. The Human Mock Interview evaluates not just your technical output but also how well you can explain your project and reasoning. Basic clear communication in English is important." },
                          { value: "item-10f", q: "What if my English communication is not strong?", a: "The Mock Interviews will assess you based on your project and problem-solving ability. Focus on explaining your thought process clearly — fluency is not the primary criteria." },
                        ],
                      },
                      {
                        id: "projects",
                        title: "Projects",
                        questions: [
                          { value: "item-11", q: "Will there be a real project in IRP 2.0?", a: "Yes. Both levels involve a project submission: a Frontend Project in Level 1 (12 hours) and a Full Stack + AI Project in Level 2 (24 hours)." },
                          { value: "item-11b", q: "Do I actually get valuable experience through internships or is it just for certificates?", a: "NxtWave internship opportunities involve real project work at partner companies. You will gain hands-on experience with actual development tasks — not just certificates. Past students have worked on real products and received stipends." },
                          { value: "item-11c", q: "Are remote internships valuable — or will I miss out by not working in-person?", a: "Remote internships through NxtWave involve real deliverables and mentorship. The experience is comparable to in-person internships in terms of learning. You will work on actual company projects." },
                        ],
                      },
                      {
                        id: "stipend",
                        title: "Stipend & Internship Opportunities",
                        questions: [
                          { value: "item-12", q: "Are the internships paid?", a: "Yes. Level 2 clearance gives access to internships in the ₹5K–₹10K/month stipend range. Level 3 (Infinite Aura track) gives access to ₹25K+ stipend opportunities." },
                          { value: "item-13", q: "If I clear both Level 1 and Level 2, what stipend can I expect?", a: "Stipends vary by company and role. After clearing both levels, you become eligible for opportunities typically in the ₹5K–₹10K/month range. Top performers who reach Level 3 status can access ₹25K+ opportunities." },
                          { value: "item-13b", q: "Are there internships for specific domains like Data Analytics, AI/ML, or Cybersecurity?", a: "IRP 2.0 is focused on Full Stack and Frontend development opportunities. Internships in specific domains like Data Analytics or AI/ML may be available through separate channels." },
                          { value: "item-14", q: "How long are the internships?", a: "Internship duration varies by company and role. Typical duration is 3–6 months. Specific details will be shared when opportunities are released." },
                          { value: "item-15", q: "Will internships be remote or in-office?", a: "Both options may be available depending on the company. Most opportunities in the current batch are remote or hybrid." },
                          { value: "item-15b", q: "How many hours per day is expected during an internship?", a: "This varies by company. Most internships under IRP have structured working hours similar to a full-time engagement (5–6 days a week; 9 hours a day). Hence getting an NOC from your college authorities is mandatory." },
                        ],
                      },
                      {
                        id: "noc",
                        title: "NOC",
                        questions: [
                          { value: "item-17b", q: "What is an NOC, why is it required, and how does it work in the IRP 2.0 process?", a: "A No Objection Certificate (NOC) is an official letter from your college confirming they have no objection to you pursuing an internship while enrolled as a student. IRP 2.0 internship opportunities are full-time commitments — 5 to 6 days a week, up to 9 hours a day. Companies require this letter to confirm your college is aware and has no objections. Without it, you cannot accept any internship opportunity even after clearing the assessments. You do not need the NOC to appear for the assessments. Submit each registration form only once." },
                        ],
                      },
                      {
                        id: "opportunities",
                        title: "Where Opportunities Are Displayed",
                        questions: [
                          { value: "item-18", q: "Where will internship opportunities be shown after I clear the levels?", a: "Internship opportunities will be displayed on the IRP 2.0 page — this will be your single destination for viewing and applying to opportunities. The Jobs Board used previously will not be used for IRP 2.0 opportunities." },
                          { value: "item-18b", q: "When will internship opportunities start appearing?", a: "Opportunities will be made available after students have completed the Level 1 and Level 2 assessments and results are processed. Watch your email for updates." },
                        ],
                      },
                      {
                        id: "courses",
                        title: "Courses & Platform",
                        questions: [
                          { value: "item-19", q: "Where do I find the courses I need to study?", a: "All courses are available in your NxtWave Learning Portal. The course names mapped to Level 1 and Level 2 are listed in the \"Courses to Prepare\" section above." },
                          { value: "item-20", q: "Will a preparation roadmap be provided?", a: "Yes. Preparation guidance will be shared through email and our Guidance Meets. The IRP 2.0 page will also have course mapping details." },
                          { value: "item-20b", q: "Does completing IRP contribute to Growth Cycle progress?", a: "IRP assessments and Growth Cycles are separate tracks. Completing courses in your Growth Cycle is important for IRP preparation, but IRP completion itself does not directly increment Growth Cycle progress." },
                          { value: "item-20c", q: "Can I use VS Code or other tools for the project rounds?", a: "Yes. You can use your preferred IDE (VS Code, etc.) for the project rounds. The submission format will be specified when the project brief is shared." },
                        ],
                      },
                    ] as { id: string; title: string; questions: { value: string; q: string; a: string }[] }[]
                  ).map(cat => {
                    const isOpen = openCategories.includes(cat.id);
                    return (
                      <div key={cat.id}>
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className="w-full flex items-center justify-between py-4 text-left group hover:text-accent transition-colors"
                        >
                          <span className="font-semibold text-sm uppercase tracking-widest text-primary group-hover:text-accent transition-colors">{cat.title}</span>
                          <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <Accordion type="multiple" value={faqValues} onValueChange={setFaqValues} className="w-full pb-3">
                            {cat.questions.map(q => (
                              <AccordionItem key={q.value} value={q.value}>
                                <AccordionTrigger className="text-left font-medium">{q.q}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">{q.a}</AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        )}
                      </div>
                    );
                  })}
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
