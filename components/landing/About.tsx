"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Code, GraduationCap, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function About() {
    return (
        <section id="about" className="py-24 bg-background">
            <div className="max-w-5xl mx-auto px-6">
                <h3 className="text-3xl font-bold mb-8">About Me</h3>

                <div className="grid md:grid-cols-3 gap-6 auto-rows-min">

                    {/* Main Bio - Spans 2 cols */}
                    <motion.div
                        className="md:col-span-2 row-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="h-full bg-secondary/10 border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cpu className="text-primary h-5 w-5" />
                                    Background
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {DATA.about.summary}
                                </p>
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {["Systems Design", "Cloud Architecture", "Database Optimization", "API Security"].map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-sm py-1 font-normal bg-background/50 border-border/50">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        className="md:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <a href={DATA.personalInfo.leetcode} target="_blank" rel="noopener noreferrer" className="block h-full">
                            <Card className="h-full bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Code className="text-primary h-4 w-4" />
                                        Problem Solving
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold font-mono text-primary mb-1">200+</div>
                                    <p className="text-sm text-muted-foreground">DSA Problems Solved</p>
                                    <div className="flex gap-2 mt-4 text-xs text-muted-foreground">
                                        <span className="px-2 py-1 bg-background rounded border border-border/50">Graphs</span>
                                        <span className="px-2 py-1 bg-background rounded border border-border/50">DP</span>
                                        <span className="px-2 py-1 bg-background rounded border border-border/50">Trees</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        className="md:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="h-full bg-secondary/10 border-border/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <MapPin className="text-primary h-4 w-4" />
                                    Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <h4 className="text-xl font-bold mb-1">{DATA.personalInfo.location}</h4>
                                <p className="text-sm text-muted-foreground">Open to Remote & Relocation</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Education Card - Spans full width on mobile, 3 cols on bottom */}
                    <motion.div
                        className="md:col-span-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="bg-secondary/10 border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="text-primary h-5 w-5" />
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-lg">{DATA.about.education.university}</h4>
                                    <p className="text-muted-foreground">{DATA.about.education.degree}</p>
                                </div>
                                <div className="text-right md:text-left">
                                    <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">{DATA.about.education.dates}</span>
                                    <p className="text-sm mt-2 text-muted-foreground">{DATA.about.education.coursework}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
