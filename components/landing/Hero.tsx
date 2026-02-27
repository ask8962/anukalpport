"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/lib/data";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20">
            {/* Animated Grid & Gradients */}
            <div className="absolute inset-0 z-[-2] bg-grid-white/[0.02]" />
            <div className="absolute inset-0 z-[-2] bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_0%,black_100%)]" />

            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 z-0" fill="currentColor" />

            {/* Glowing Orbs */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] z-[-1] max-w-lg pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-accent/20 blur-[120px] z-[-1] max-w-sm pointer-events-none"
            />

            <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                >
                    <motion.div variants={itemVariants}>
                        <Badge variant="outline" className="mb-8 px-4 py-2 text-sm font-medium rounded-full glass border-primary/30 text-primary shadow-[0_0_15px_rgba(139,92,246,0.15)] flex items-center">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Available for Internships & Freelance
                        </Badge>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-4 leading-none relative z-10">
                        <span className="text-foreground">{DATA.personalInfo.name.split(' ')[0]}</span>
                        <br className="md:hidden" />
                        <span className="text-gradient ml-0 md:ml-4">{DATA.personalInfo.name.split(' ').slice(1).join(' ')}</span>
                    </motion.h1>

                    <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/80 mb-8 font-mono tracking-tight relative z-10">
                        {DATA.personalInfo.role}
                    </motion.h2>

                    <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12 relative z-10">
                        <TextGenerateEffect words={DATA.personalInfo.tagline} className="text-lg md:text-xl text-muted-foreground font-light text-balance" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
                        <Button size="lg" className="h-14 px-8 text-lg group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-105 w-full sm:w-auto" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            View Projects
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                        </Button>

                        <a href={DATA.personalInfo.resumeUrl} download className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full glass hover:bg-white/10 w-full sm:w-auto transition-all hover:scale-105 border-white/10">
                                <Download className="mr-2 h-5 w-5" />
                                Download CV
                            </Button>
                        </a>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-16 flex justify-center gap-6 text-muted-foreground">
                        {[
                            { icon: Github, href: DATA.personalInfo.github },
                            { icon: Linkedin, href: DATA.personalInfo.linkedin },
                            { icon: Mail, href: `mailto:${DATA.personalInfo.email}` },
                        ].map((item, idx) => (
                            <a key={idx} href={item.href} target="_blank" rel="noreferrer"
                                className="p-3 rounded-full glass hover:text-primary hover:border-primary/50 transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                <item.icon className="h-6 w-6" />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
