import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowRight, CheckCircle2, ChevronDown, Clock, Code, 
  Database, FileCode2, Info, Rocket, Server, Star, Trophy, 
  User, CheckCircle, Navigation
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
      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-accent to-blue-500 py-2.5 text-center">
        <p className="text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-white/70 animate-pulse" />
          Summer 2026 IRP 2.0 Batch — Open Now!
          <span className="hidden sm:inline text-white/70 font-normal">· First Assessment: 14th June 2026</span>
          <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer" className="ml-2 underline underline-offset-2 text-white/90 hover:text-white font-semibold">Register →</a>
        </p>
      </div>
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
          <Button onClick={() => scrollTo('register')} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Register Now
          </Button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[75vh] overflow-hidden flex flex-col items-center justify-center text-center px-4">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-background to-background"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-3/4 mx-auto flex flex-col items-center"
          >
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
              First Assessment: 14th June 2026
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
              Internship Readiness <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Path 2.0</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
              Built exclusively for 1st & 2nd Year Students (YOG 2028 & 2029). 
              Launch your career with guaranteed internship opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm px-6 py-3 rounded-full" onClick={() => scrollTo('register')}>
                Register for IRP 2.0 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-blue-50 text-sm px-6 py-3 rounded-full" onClick={() => scrollTo('levels')}>
                View the Path
              </Button>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What is IRP 2.0?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                IRP 2.0 is NxtWave Academy's structured program to help 1st and 2nd year students prepare for and access internship opportunities. It's built specifically for you — the assessments, projects, and interviews are all scoped to what you've studied at your current year level. <span className="font-semibold text-foreground">100% online. No offline rounds. No travel. No logistics.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border border-border text-foreground shadow-sm">
                <CardHeader className="pb-3">
                  <Badge variant="outline" className="w-fit mb-3 text-muted-foreground border-border">Before</Badge>
                  <CardTitle className="text-2xl font-bold">The old IRP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Assessed alongside 3rd, 4th & final year students",
                    "Common assessments regardless of year",
                    "Online + Offline rounds (travel required)",
                    "One-size-fits-all process",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border border-accent/20 relative overflow-hidden text-foreground shadow-sm">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-3 bg-accent text-white border-none">Now</Badge>
                  <CardTitle className="text-2xl font-bold">IRP 2.0</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Tailored assessments — only what you've studied",
                    "Year-level appropriate content",
                    "100% Online — attempt from anywhere",
                    "Multi-level structure with progressive unlocks",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Levels Section */}
        <section id="levels" className="py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">The Three Levels</h2>
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
                <Card className="h-full border-t-4 border-t-blue-500 relative flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Level 1</Badge>
                      <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 14 Jun '26
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
                          <span className="text-muted-foreground text-xs">MCQ • 1.5 hrs • 4 Qs</span>
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
                <Card className="h-full border-t-4 border-t-accent relative flex flex-col shadow-lg shadow-accent/5">
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
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Courses to Prepare</h2>
              <p className="text-lg text-muted-foreground">Complete these mandatory courses on the NxtWave platform.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card text-card-foreground shadow-sm">
                <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Code className="h-5 w-5 text-blue-500" /> Level 1 Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {[
                      "Build your own Static Website",
                      "Build your own Responsive Website",
                      "Modern Responsive Web Design",
                      "Build your own Dynamic Web Application",
                      "JS Essentials",
                      "Getting Started with React JS",
                      "Programming Foundations",
                      "Data Structures & Algorithms — Level 1"
                    ].map((course, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="font-medium text-sm md:text-base">{course}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground shadow-sm">
                <CardHeader className="bg-accent/5 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Database className="h-5 w-5 text-accent" /> Level 2 Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {[
                      "Node JS",
                      "Introduction to Databases",
                      "DBMS",
                      "MongoDB",
                      "Generative AI",
                      "OOPs"
                    ].map((course, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        <span className="font-medium text-sm md:text-base">{course}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section id="checklist" className="py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <Card className="bg-primary/20 border-primary/30 backdrop-blur-sm overflow-hidden text-foreground">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="text-3xl font-bold">Pre-Assessment Checklist</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-2">Ensure you've completed these steps before assessment day.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 md:px-12 pb-10">
                <div className="space-y-6">
                  {[
                    { title: "Study & Revise", detail: "Go through all concepts at your year level — Python, DSA basics, HTML, CSS, JavaScript, React." },
                    { title: "Practice Regularly", detail: "Solve problems on the NxtWave platform every day. Consistency beats cramming." },
                    { title: "Complete Pending Courses", detail: "All mandatory courses up to your current level must be completed before the assessment." },
                    { title: "Submit Your NOC", detail: "Your No Objection Certificate from college must be submitted before you can participate in internship opportunities. Reach out to your Success Coach if you need help." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100 shadow-sm">
                      <div className="bg-accent/20 p-2 rounded-full mt-0.5 shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-24 bg-blue-50 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Eligibility & Registration</h2>
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
                  <a href="https://bit.ly/Internship-registration" target="_blank" rel="noopener noreferrer" className="text-accent text-sm font-medium hover:underline break-all">bit.ly/Internship-registration</a>
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

                      <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg rounded-xl font-bold">
                        Complete Registration
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">All Your IRP 2.0 Questions — Answered Here</h2>
            </div>

            <Card className="bg-card text-card-foreground">
              <CardContent className="pt-6">
                <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-4", "item-5", "item-8"]} className="w-full">

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
