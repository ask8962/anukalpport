"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Code, GraduationCap, Cpu, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function About() {
    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden min-h-screen flex items-center">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16"
                >
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground flex items-center gap-3">
                        <Zap className="h-8 w-8 text-primary" />
                        About Me
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-2xl">A glimpse into my background, problem-solving journey, and where I'm based.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {/* Main Bio - Spans 2 cols & 2 rows */}
                    <motion.div
                        className="md:col-span-2 md:row-span-2 h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="h-full glass-panel border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardHeader className="relative z-10 pb-2">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Cpu className="text-primary h-6 w-6" />
                                    Background & Journey
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10 flex flex-col justify-between h-[calc(100%-4rem)]">
                                <p className="text-[1.1rem] text-muted-foreground/90 leading-relaxed font-light">
                                    {DATA.about.summary}
                                </p>
                                <div className="mt-8 flex flex-wrap gap-2.5">
                                    {["Systems Design", "Cloud Architecture", "Database Optimization", "API Security", "Microservices"].map((tag, i) => (
                                        <Badge key={tag} variant="secondary" className="text-sm px-4 py-1.5 font-medium bg-white/5 hover:bg-white/10 border-white/10 transition-colors">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        className="md:col-span-1 h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <a href={DATA.personalInfo.leetcode} target="_blank" rel="noopener noreferrer" className="block h-full group">
                            <Card className="h-full bg-primary/10 border-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden flex flex-col justify-center">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <CardHeader className="text-center pb-2 relative z-10">
                                    <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <Code className="text-primary h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-base text-foreground/80">Problem Solving</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center relative z-10">
                                    <div className="text-6xl font-black font-mono text-foreground mb-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">200<span className="text-primary">+</span></div>
                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">DSA Solved</p>
                                    <div className="flex justify-center gap-2 mt-6 text-xs font-mono">
                                        {["Graphs", "DP", "Trees"].map(t => (
                                            <span key={t} className="px-2.5 py-1 bg-black/40 rounded border border-white/10 text-primary-foreground/70">{t}</span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        className="md:col-span-1 h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="h-full glass-panel border-white/10 relative overflow-hidden group flex flex-col justify-center items-center text-center">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 p-6">
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(var(--accent),0.3)]"
                                >
                                    <MapPin className="text-accent h-8 w-8" />
                                </motion.div>
                                <h4 className="text-2xl font-bold mb-2 text-foreground">{DATA.personalInfo.location}</h4>
                                <p className="text-sm text-muted-foreground bg-white/5 rounded-full px-4 py-1.5 inline-block border border-white/5">Open to Remote & Relocation</p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Education Card - Spans full width on bottom */}
                    <motion.div
                        className="md:col-span-3 h-[auto]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="glass-panel border-white/10 overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:bg-accent transition-colors duration-500" />
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <GraduationCap className="text-accent h-6 w-6" />
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h4 className="font-bold text-2xl text-foreground mb-1">{DATA.about.education.university}</h4>
                                    <p className="text-lg text-primary">{DATA.about.education.degree}</p>
                                </div>
                                <div className="md:text-right">
                                    <span className="font-mono text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold border border-primary/20 inline-block mb-3">{DATA.about.education.dates}</span>
                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm ml-auto">{DATA.about.education.coursework}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
