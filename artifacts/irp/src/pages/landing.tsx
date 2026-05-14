import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock, Code, 
  Database, ExternalLink, FileCode2, FileText, Info, Menu, Rocket, Server, Star, Terminal, Trophy, 
  User, CheckCircle, Navigation, X, XCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  yog: z.enum(["2028", "2029"], { required_error: "Please select your year of graduation" }),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  level: z.enum(["Level 1", "Level 2"], { required_error: "Please select a level" }),
  nocSubmitted: z.enum(["Yes", "No"], { required_error: "Please indicate if you have submitted NOC" }),
});

export default function LandingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const allFaqItems = ["item-1","item-2","item-3","item-3b","item-4","item-5","item-6","item-7","item-7b","item-8","item-9","item-10","item-10b","item-10c","item-11","item-12","item-12b","item-13","item-14","item-15","item-15b","item-16","item-17","item-17b","item-17c","item-18","item-18b","item-19","item-20","item-20b"];
  const [faqValues, setFaqValues] = useState<string[]>(["item-1","item-4","item-8","item-11","item-13","item-16","item-18","item-19"]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
    console.log(values);
  }

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
        <section id="hero" className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/80 via-white to-white"></div>

          <div className="container mx-auto max-w-6xl px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-stretch min-h-[320px] md:min-h-[360px] gap-0">

              {/* Left — text, centred vertically */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-[55_55_0%] flex flex-col justify-center py-8 pr-0 md:pr-4"
              >
                <div className="flex flex-row items-center gap-2 mb-4 flex-wrap">
                  <Badge className="bg-blue-700 text-white border-none px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap">
                    ✦ Summer 2026 IRP 2.0 Batch — Open Now!
                  </Badge>
                  <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 px-3 py-1 text-xs font-medium rounded-full cursor-pointer flex items-center gap-1 whitespace-nowrap">
                      First Assessment: 14th June 2026
                      <ExternalLink className="h-3 w-3" />
                    </Badge>
                  </a>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 leading-[1.1]">
                  Internship Readiness
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Path 2.0</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md leading-relaxed">
                  Built exclusively for 1st &amp; 2nd Year Students (YOG 2028 &amp; 2029).
                  Earn your first stipend internship — fully online, fully merit-based.
                </p>

                <div className="flex flex-row gap-3 flex-wrap">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm px-5 py-2.5 rounded-full" onClick={() => scrollTo('register')}>
                    Register for IRP 2.0 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-blue-50 text-sm px-5 py-2.5 rounded-full" onClick={() => scrollTo('levels')}>
                    View the Path
                  </Button>
                </div>
              </motion.div>

              {/* Right — illustration flush to bottom */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex-[45_45_0%] hidden md:flex items-end justify-start"
              >
                <img
                  src="/hero-illustration.png"
                  alt="Students climbing toward internship goal"
                  className="w-auto object-contain object-bottom mix-blend-multiply select-none"
                  style={{ height: "75%", maxHeight: "300px", marginBottom: "-2px" }}
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gradient-to-b from-blue-50 via-indigo-50/40 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">

            {/* Two-column header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-blue-700">What is IRP 2.0?</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  IRP 2.0 is NxtWave Academy's structured program to help 1st and 2nd year students prepare for and access internship opportunities. It's built specifically for you — the assessments, projects, and interviews are all scoped to what you've studied at your current year level.{" "}
                  <span className="font-semibold text-accent">100% online. No offline rounds. No travel. No logistics.</span>
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <img
                  src="/about-journey.png"
                  alt="Career journey illustration"
                  className="w-full max-w-sm md:max-w-md object-contain mix-blend-multiply select-none"
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
        <section id="levels" className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-accent to-indigo-500">The Three Levels</h2>
              <p className="text-lg text-muted-foreground">Progress through the ranks to unlock top opportunities.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Level 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full border-t-4 border-t-blue-500 relative flex flex-col bg-gradient-to-b from-white to-blue-50/60">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Level 1</Badge>
                      <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 14 June 2026
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold">The Hustler</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 text-sm space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 border-b pb-2"><FileCode2 className="h-4 w-4" /> Assessment Format</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col">
                          <span className="font-medium text-foreground">Python + DSA</span>
                          <span className="text-muted-foreground text-xs">MCQ • 1.5 hrs • 40 Qs</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium text-foreground">Frontend (HTML, CSS, JS, React)</span>
                          <span className="text-muted-foreground text-xs">MCQ • 30 mins • 30 Qs</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 border-b pb-2"><User className="h-4 w-4" /> Post-Assessment</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" /> FE Project Build (12 hrs)</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" /> AI Mock Interview (1 hr)</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" /> Human Mock Interview (1 hr)</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-blue-50/50 mt-auto pt-4 rounded-b-xl border-t border-border/50">
                    <p className="text-sm font-medium text-blue-700 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> Unlocks Eligibility for Level 2
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Level 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full border-t-4 border-t-accent relative flex flex-col shadow-lg shadow-accent/10 bg-gradient-to-b from-white to-accent/5">
                  <div className="absolute -top-3 -right-3">
                    <Badge className="bg-accent text-accent-foreground border-none shadow-md">Crucial Stage</Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-accent/10 text-accent hover:bg-accent/10 border-accent/20">Level 2</Badge>
                      <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> ~1 Month After L1
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold">The Main Character</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 text-sm space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 border-b pb-2"><Server className="h-4 w-4" /> Assessment Format (1 hr total)</h4>
                      <ul className="space-y-3">
                        <li className="flex flex-col">
                          <span className="font-medium text-foreground">Backend (NodeJS + Express)</span>
                          <span className="text-muted-foreground text-xs">MCQ • 20 mins • 20 Qs</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium text-foreground">Database (SQL, NoSQL, Mongo)</span>
                          <span className="text-muted-foreground text-xs">MCQ • 20 mins • 20 Qs</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium text-foreground">GenAI</span>
                          <span className="text-muted-foreground text-xs">MCQ • 20 mins • 20 Qs</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 border-b pb-2"><User className="h-4 w-4" /> Post-Assessment</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" /> Full Stack + AI Project (24 hrs)</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" /> AI Mock Interview (1 hr)</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" /> Human Mock Interview (1 hr)</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-accent/5 mt-auto pt-4 rounded-b-xl border-t border-accent/10">
                    <p className="text-sm font-bold text-accent flex items-center gap-2">
                      <Trophy className="h-4 w-4" /> Unlocks Internships (₹5K–₹10K)
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Level 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full border-t-4 border-t-purple-500 relative flex flex-col bg-gradient-to-b from-white to-purple-50 dark:from-card dark:to-purple-900/10">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">Level 3</Badge>
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Curated Track</span>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Infinite Aura</CardTitle>
                    <CardDescription>Unlocks after clearing BOTH L1 & L2.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 text-sm space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 border-b pb-2"><Star className="h-4 w-4 text-purple-500" /> Exclusive Benefits</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-md shrink-0">
                            <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">₹25K+ Stipend Internships</span>
                            <span className="text-muted-foreground text-xs">Access to premium opportunities</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-md shrink-0">
                            <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">Elite Mentorship</span>
                            <span className="text-muted-foreground text-xs">Mentors from Microsoft, Apple, Google, Salesforce</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-md shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground block">Founding Team Access</span>
                            <span className="text-muted-foreground text-xs">Interact with NxtWave leadership</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 border-b pb-2 text-purple-700"><User className="h-4 w-4 text-purple-500" /> Elite Mentors From</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Microsoft", "Apple", "Google", "Salesforce"].map((brand) => (
                          <span key={brand} className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">{brand}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-purple-50/60 mt-auto pt-4 rounded-b-xl border-t border-purple-100">
                    <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }} className="text-sm font-medium text-purple-700 flex items-center gap-2 hover:underline">
                      <Trophy className="h-4 w-4" /> See Infinite Aura eligibility →
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
                  {/* DSA Track */}
                  <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                    <div className="bg-blue-500 px-4 py-2.5 flex items-center gap-2">
                      <Code className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">DSA Track</span>
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
                    <div className="px-4 pb-3 pt-3 bg-blue-50/60">
                      <p className="text-xs text-muted-foreground">Python is the recommended language for the DSA assessment.</p>
                    </div>
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
                <div className="ml-16 md:ml-24">
                  <div className="bg-white rounded-xl border border-accent/20 shadow-sm overflow-hidden">
                    <div className="bg-accent px-4 py-2.5 flex items-center gap-2">
                      <Database className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-bold">Full-Stack + GenAI Track</span>
                    </div>
                    <ul className="divide-y divide-blue-50 grid sm:grid-cols-2">
                      {[
                        { name: "Node JS", url: "https://learning.ccbp.in/cl-course/d82d6905-6694-42c4-8c0c-bd2c887c1b53" },
                        { name: "Introduction to Databases", url: "https://learning.ccbp.in/cl-course/25c1a72c-216e-47e1-9bc6-b2f16c66e0ca" },
                        { name: "DBMS", url: "https://learning.ccbp.in/course?c_id=3ba04d30-7c3a-4d5d-8c23-6e3bfc093511" },
                        { name: "MongoDB", url: "https://learning.ccbp.in/course?c_id=a5777f9b-1a9c-42a5-aab7-0182e80efca2&s_id=f09a898b-f8e3-4ded-a6c7-46184629ff3d&t_id=42d9584b-aee6-4eb6-b1ed-8f8de7a29633" },
                        { name: "Generative AI", url: "https://learning.ccbp.in/course?c_id=b9811b34-585b-47e0-a0be-65f1081a74f2&s_id=64025833-d46d-4e7c-a7e0-a9c230a78b9d&t_id=096cf0ff-cdc5-4efb-9895-7c9aff0dbb1e" },
                      ].map((c, i) => (
                        <li key={i} className="border-blue-50">
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
                    <ul className="divide-y divide-purple-50 grid sm:grid-cols-2">
                      {[
                        { name: "DSA — Level 2", url: "https://learning.ccbp.in/course?c_id=229cbe49-f4c4-4aa2-bcc6-55ea3e15e159" },
                        { name: "DSA — Level 3", url: "https://learning.ccbp.in/course?c_id=68d141a9-3a73-4bc3-8d8c-cfff7ec8a4be&s_id=696cf715-22e7-4587-ac63-6c5df7427ad5&t_id=009e5ade-f694-4a42-8dbf-544f06a4da1e" },
                        { name: "LeetCode Rating", url: "https://leetcode.com" },
                        { name: "CodeChef Rating", url: "https://www.codechef.com" },
                      ].map((c, i) => (
                        <li key={i} className="border-purple-50">
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-purple-50 transition-colors group">
                            <span className="text-sm font-medium text-foreground group-hover:text-purple-700 transition-colors">{c.name}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-purple-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
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
              {[
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
                  detail: "Solve practice on platforms like Codeforces, LeetCode, or GeeksforGeeks.",
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
                  detail: "Pay, find more college before you can access internship opportunities.",
                  gradient: "from-violet-500 to-purple-600",
                  bg: "bg-violet-50",
                },
              ].map((item, i) => (
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

            <Card className="border-border/50 shadow-xl bg-card text-card-foreground">
              <CardHeader className="border-b bg-muted/20 pb-6">
                <CardTitle className="text-2xl">Internship Profile Registration</CardTitle>
                <CardDescription>This is a mandatory first step before appearing for assessments.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Registration Submitted!</h3>
                    <p className="text-muted-foreground">Check your email for next steps and assessment details.</p>
                    <Button variant="outline" className="mt-8" onClick={() => setIsSubmitted(false)}>Submit another</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-background" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="yog"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year of Graduation (YOG)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select YOG" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="2028">2028</SelectItem>
                                  <SelectItem value="2029">2029</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email ID</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" className="bg-background" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+91 9876543210" className="bg-background" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Which level are you registering for?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Select Level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Level 1">Level 1</SelectItem>
                                <SelectItem value="Level 2">Level 2</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nocSubmitted"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Have you submitted NOC from your college?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-6"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3">
                        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-2.5 text-sm rounded-lg font-semibold">
                          Complete Registration
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          We will only use this information to contact you about IRP 2.0.{" "}
                          <a href="https://www.nxtwave.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">Privacy policy</a>.
                        </p>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white">
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
                    <AccordionContent className="text-muted-foreground">IRP 2.0 is exclusively for YOG 2028 and YOG 2029 students — that's 1st and 2nd year students. If you recently completed your 2nd year, you are still eligible. If you are YOG 2027 or earlier, please connect with your Success Coach for the appropriate process.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-medium">I just completed my 2nd year. Am I eligible?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. YOG 2028 students who have just completed their 2nd year are eligible to participate in IRP 2.0.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-medium">Are Smart Program students eligible?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">If you are a YOG 2028 or 2029 student under the Smart Program, check with your Success Coach — eligibility is determined by YOG, not program type.</AccordionContent>
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
                    <AccordionContent className="text-muted-foreground">You will not be eligible for internship opportunities until you clear Level 2 as well. Details on retake windows will be communicated separately.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left font-medium">Can I attempt both Level 1 and Level 2 at the same time?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Level 2 is only accessible after you complete Level 1. Level 2 opens approximately one month after Level 1's assessment date.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left font-medium">Are all assessments online?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. All rounds under IRP 2.0 — MCQs, projects, AI Mock Interview, and Human Mock Interview — are 100% online. There are no offline rounds.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7b">
                    <AccordionTrigger className="text-left font-medium">Will there be a second attempt if I miss or fail the June 14th assessment?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Details on retake opportunities will be shared after the first assessment window. Watch your registered email for updates.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Skills & Preparation</h3></div>
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left font-medium">What skills do I need for Level 1?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Python (fundamentals), DSA Level 1, HTML, CSS, JavaScript (Essentials), and React (Getting Started). These map directly to the NxtWave courses listed in the Level 1 section.</AccordionContent>
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
                    <AccordionContent className="text-muted-foreground">Yes. GenAI is one of the three MCQ sections in Level 2, alongside Backend (NodeJS + Express) and Databases.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10c">
                    <AccordionTrigger className="text-left font-medium">Does communication matter in the interview?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. The Human Mock Interview evaluates not just your technical output but also how well you can explain your project and reasoning. Basic clear communication in English is important. Focus on explaining your thought process clearly — fluency is not the primary criteria.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Projects</h3></div>
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-left font-medium">Will there be a real project in IRP 2.0?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Both levels involve a project submission: a Frontend Project in Level 1 (12 hours) and a Full Stack + AI Project in Level 2 (24 hours).</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-12">
                    <AccordionTrigger className="text-left font-medium">Can I use VS Code or other tools for the project rounds?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. You can use your preferred IDE (VS Code, etc.) for the project rounds. The submission format will be specified when the project brief is shared.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-12b">
                    <AccordionTrigger className="text-left font-medium">Are remote internships valuable — or will I miss out by not working in-person?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Remote internships through NxtWave involve real deliverables and mentorship. The experience is comparable to in-person internships in terms of learning. You will work on actual company projects.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Stipend & Internship Opportunities</h3></div>
                  <AccordionItem value="item-13">
                    <AccordionTrigger className="text-left font-medium">Are the internships paid?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Level 2 clearance gives access to internships in the ₹5K–₹10K/month stipend range. Level 3 (Infinite Aura track) gives access to ₹25K+ stipend opportunities.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-14">
                    <AccordionTrigger className="text-left font-medium">If I clear both Level 1 and Level 2, what stipend can I expect?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Stipends vary by company and role. After clearing both levels, you become eligible for opportunities typically in the ₹5K–₹10K/month range. Top performers who reach Level 3 status can access ₹25K+ opportunities.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-15">
                    <AccordionTrigger className="text-left font-medium">How long are the internships?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Typical duration is 3–4 months. Specific details will be shared when opportunities are released. Most internships are designed to be manageable alongside your college schedule.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-15b">
                    <AccordionTrigger className="text-left font-medium">Will internships be remote or in-office?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Both options may be available depending on the company. Most opportunities in the current batch are remote or hybrid.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-4 mt-8"><h3 className="font-bold text-base text-primary border-b pb-2 uppercase tracking-wide text-xs">Registration & NOC</h3></div>
                  <AccordionItem value="item-16">
                    <AccordionTrigger className="text-left font-medium">How do I register for the assessment?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Complete your Internship Profile Registration at <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer" className="text-accent underline">bit.ly/Internship-registration</a>. Without registration, you will not be eligible to appear for assessments or access internship opportunities.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17">
                    <AccordionTrigger className="text-left font-medium">Is the registration form the same as the feedback form from the Internship Readiness Meet?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">No. The registration form and the feedback form are separate links. Make sure you complete the registration form at the link above — not just the feedback form.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17b">
                    <AccordionTrigger className="text-left font-medium">Can I choose Level 1 now and also appear for Level 2 later?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. You will register for Level 1 first. Once Level 1 is cleared, you will register for Level 2 separately.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17c">
                    <AccordionTrigger className="text-left font-medium">Is NOC mandatory?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. A No Objection Certificate from your college is required to participate in internship opportunities. You can appear for the assessment without the NOC, but you need it to actually access and accept internship opportunities. Submit it as early as possible.</AccordionContent>
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
                    <AccordionTrigger className="text-left font-medium">Does completing IRP contribute to Growth Cycle progress?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">IRP assessments and Growth Cycles are separate tracks. Completing courses in your Growth Cycle is important for IRP preparation, but IRP completion itself does not directly increment Growth Cycle progress.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-20b">
                    <AccordionTrigger className="text-left font-medium">Will a preparation roadmap be provided?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. Preparation guidance will be shared through email and via your Success Coach. This page will also have course mapping details.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <p className="text-center text-sm text-muted-foreground mt-6">For any queries not covered here, reach out to your Success Coach or contact the NxtWave Academy Student Success team. <span className="text-xs">— Last Updated: May 2026</span></p>
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
