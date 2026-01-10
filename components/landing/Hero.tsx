"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/lib/data";

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20">
            {/* Abstract Background Element */}
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

            <div className="max-w-5xl mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium rounded-full bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
                        Available for Internships & Freelance
                    </Badge>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        {DATA.personalInfo.name}
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 mb-8 font-mono tracking-tight">
                        {DATA.personalInfo.role}
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
                        {DATA.personalInfo.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="h-12 px-8 text-base group rounded-full" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <a href={DATA.personalInfo.resumeUrl} download>
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full hover:bg-secondary/80">
                                <Download className="mr-2 h-4 w-4" />
                                Download CV
                            </Button>
                        </a>
                    </div>

                    <div className="mt-16 flex justify-center gap-8 text-muted-foreground/60">
                        <a href={DATA.personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors hover:scale-110 duration-200">
                            <Github className="h-6 w-6" />
                        </a>
                        <a href={DATA.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors hover:scale-110 duration-200">
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a href={`mailto:${DATA.personalInfo.email}`} className="hover:text-foreground transition-colors hover:scale-110 duration-200">
                            <Mail className="h-6 w-6" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
