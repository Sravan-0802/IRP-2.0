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
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => scrollTo('hero')}>
            <span className="text-accent">NxtWave</span> Academy
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
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-full" onClick={() => scrollTo('register')}>
                Register for IRP 2.0 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-blue-50 text-lg px-8 py-6 rounded-full" onClick={() => scrollTo('levels')}>
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
                IRP 2.0 is a multi-level online assessment path designed to evaluate your skills and connect you with high-paying internship opportunities ranging from ₹5K to ₹25K+ stipends.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary/10 border-primary/20 backdrop-blur-sm text-foreground">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" /> Before
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-500/20 p-1 rounded-full"><span className="h-2 w-2 block bg-red-500 rounded-full"></span></div>
                    <span className="text-muted-foreground">Offline assessment rounds</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-500/20 p-1 rounded-full"><span className="h-2 w-2 block bg-red-500 rounded-full"></span></div>
                    <span className="text-muted-foreground">Assessed alongside senior batches</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-500/20 p-1 rounded-full"><span className="h-2 w-2 block bg-red-500 rounded-full"></span></div>
                    <span className="text-muted-foreground">Common, generic assessments</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/10 border-accent/30 backdrop-blur-sm relative overflow-hidden text-foreground">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-accent">
                    <Rocket className="h-5 w-5" /> IRP 2.0
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-medium text-foreground">100% Online process</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-medium text-foreground">Tailored specifically by year level</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-medium text-foreground">Multi-level structured assessment</span>
                  </div>
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
                    "Study & Revise all concepts up to your year level.",
                    "Practice daily on the NxtWave platform.",
                    "Complete all mandatory courses before assessment date.",
                    "Submit NOC (No Objection Certificate) from your college — reach out to your Success Coach for help."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100 shadow-sm">
                      <div className="bg-accent/20 p-2 rounded-full mt-0.5 shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                      <p className="text-lg font-medium leading-tight">{item}</p>
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
                <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4", "item-5"]} className="w-full">
                  
                  <div className="mb-6"><h3 className="font-bold text-lg text-primary border-b pb-2">Eligibility</h3></div>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-medium">1. Who is eligible for IRP 2.0?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">YOG 2028 and YOG 2029 students registered on NxtWave Academy.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-medium">2. Can YOG 2027 students participate?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">No, IRP 2.0 is exclusively for YOG 2028 and YOG 2029 students.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-medium">3. Is registration mandatory before appearing for Level 1?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes. You must complete Internship Profile Registration before the assessment date.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Assessment Process</h3></div>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-medium">4. What is the format of Level 1?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">MCQ rounds (Python/DSA + Frontend), followed by a 12-hour FE Project and mock interviews, all on the same day.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-medium">5. What is the format of Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">MCQ rounds (Backend, Database, GenAI), followed by a 24-hour Full Stack + AI Project and mock interviews.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left font-medium">6. Can I skip Level 1 and directly appear for Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">No. You must clear Level 1 before you're eligible for Level 2.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left font-medium">7. How long after Level 1 is Level 2 conducted?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Approximately 1 month after Level 1.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Skills & Preparation</h3></div>
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left font-medium">8. What topics should I focus on for Level 1?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Python, DSA, HTML, CSS, JavaScript, and React JS.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-left font-medium">9. What topics should I focus on for Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">NodeJS, Express, SQL, NoSQL, MongoDB, and Generative AI.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-left font-medium">10. Where can I practice?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">On the NxtWave platform. Complete all mandatory courses listed in the "Courses to Prepare" section.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Projects</h3></div>
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-left font-medium">11. What is the FE Project in Level 1?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">A frontend project to be built and submitted within 12 hours on the same day as the MCQ.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-12">
                    <AccordionTrigger className="text-left font-medium">12. What is the Full Stack + AI Project in Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">A comprehensive full-stack project with AI integration, to be submitted within 24 hours.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Stipend & Opportunities</h3></div>
                  <AccordionItem value="item-13">
                    <AccordionTrigger className="text-left font-medium">13. What internship stipend can I expect after clearing Level 1 and Level 2?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">₹5,000 to ₹10,000 per month.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-14">
                    <AccordionTrigger className="text-left font-medium">14. How do I qualify for ₹25K+ stipend internships?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">By additionally qualifying for Level 3 (Infinite Aura track) after clearing both Level 1 and Level 2.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-15">
                    <AccordionTrigger className="text-left font-medium">15. Does clearing only Level 1 make me eligible for internships?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">No. Internship opportunities unlock only after clearing both Level 1 AND Level 2.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Registration & NOC</h3></div>
                  <AccordionItem value="item-16">
                    <AccordionTrigger className="text-left font-medium">16. What is NOC and why do I need it?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">A No Objection Certificate from your college confirming they permit you to pursue the internship. Reach out to your Success Coach for help obtaining it.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17">
                    <AccordionTrigger className="text-left font-medium">17. How do I register?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Complete the Internship Profile Registration using the form on this page or the registration link shared by your Success Coach.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Where Opportunities Are Displayed</h3></div>
                  <AccordionItem value="item-18">
                    <AccordionTrigger className="text-left font-medium">18. Where will I see internship opportunities after qualifying?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Opportunities will be shared through the NxtWave platform and your Success Coach after you qualify.</AccordionContent>
                  </AccordionItem>

                  <div className="mb-6 mt-8"><h3 className="font-bold text-lg text-primary border-b pb-2">Courses & Platform</h3></div>
                  <AccordionItem value="item-19">
                    <AccordionTrigger className="text-left font-medium">19. Are all the preparation courses free on the NxtWave platform?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Yes, all mandatory courses are available on the NxtWave Academy platform for registered students.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-20">
                    <AccordionTrigger className="text-left font-medium">20. What if I haven't completed all the courses yet?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Focus on completing the mandatory courses listed in the "Courses to Prepare" section before the assessment date.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="bg-primary py-12 border-t border-primary/80">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span className="text-blue-200">NxtWave</span> Academy
          </div>
          <div className="text-blue-100 font-medium text-center md:text-left">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <Navigation className="h-4 w-4" /> Reach your Success Coach for support
            </p>
          </div>
          <div className="text-blue-200 text-sm">
            © {new Date().getFullYear()} NxtWave Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
