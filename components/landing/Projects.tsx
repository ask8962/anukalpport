"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Filter } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

const ALL_TAG = "All";
const CATEGORIES = [ALL_TAG, "Full Stack", "Backend", "Frontend", "AI/ML"];

export function Projects() {
    const [activeCategory, setActiveCategory] = useState(ALL_TAG);

    // Helper to categorize projects based on tech stack or title
    // Since we didn't add explicit categories to data.ts, we infer them
    const getCategories = (project: typeof DATA.projects[0]) => {
        const tags = new Set([ALL_TAG]);
        const techString = project.tech.join(" ").toLowerCase();

        if (techString.includes("spring") || techString.includes("node") || techString.includes("backend")) tags.add("Backend");
        if (techString.includes("react") || techString.includes("next") || techString.includes("flutter")) tags.add("Frontend");
        if (project.description.toLowerCase().includes("full-featured") || (tags.has("Backend") && tags.has("Frontend"))) tags.add("Full Stack");
        if (techString.includes("ai") || techString.includes("gemini")) tags.add("AI/ML");

        return Array.from(tags);
    };

    const filteredProjects = DATA.projects.filter(project => {
        if (activeCategory === ALL_TAG) return true;
        const projectCategories = getCategories(project);
        return projectCategories.includes(activeCategory);
    });

    return (
        <section id="projects" className="py-32 bg-background relative min-h-screen">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">Featured Projects</h3>
                            <p className="text-muted-foreground text-lg max-w-2xl text-balance">Real-world applications focusing on performance, scale, and premium user experiences.</p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2 p-1.5 glass rounded-xl border-white/5">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative",
                                        activeCategory === cat
                                            ? "text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    )}
                                >
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-primary rounded-lg z-[-1]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full"
                                >
                                    <CardContainer className="h-full w-full" containerClassName="py-0 flex items-stretch h-full">
                                        <CardBody className="w-full h-full flex">
                                            <CardItem translateZ="20" className="flex flex-col h-full w-full glass-panel group relative overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(139,92,246,0.2)] hover:border-primary/40 border-white/10 rounded-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
                                                <CardHeader className="pb-4 relative z-10 flex-shrink-0">
                                                    <div className="flex justify-between items-start">
                                                        <CardItem translateZ="40">
                                                            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                                                        </CardItem>
                                                        <CardItem translateZ="50" as="a" href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/10 transition-colors z-20">
                                                            <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                                        </CardItem>
                                                    </div>
                                                    <CardItem translateZ="30">
                                                        <CardDescription className="text-sm mt-3 line-clamp-3 leading-relaxed text-muted-foreground/80">{project.description}</CardDescription>
                                                    </CardItem>
                                                </CardHeader>
                                                <CardContent className="flex-1 pb-4 relative z-10">
                                                    <CardItem translateZ="20" className="space-y-4">
                                                        <div className="space-y-2.5 pt-2">
                                                            {project.metrics.slice(0, 3).map((metric, i) => (
                                                                <div key={i} className="flex gap-3 items-start text-xs text-muted-foreground/90 leading-tight">
                                                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0 shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
                                                                    <span>{metric}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardItem>
                                                </CardContent>
                                                <CardFooter className="flex-col items-start gap-4 pt-5 border-t border-white/5 bg-black/10 mt-auto relative z-10 flex-shrink-0">
                                                    <CardItem translateZ="40" className="flex flex-wrap gap-2">
                                                        {project.tech.slice(0, 4).map((t) => (
                                                            <Badge key={t} variant="secondary" className="font-mono text-[10px] uppercase font-medium bg-white/5 hover:bg-white/10 px-2.5 py-0.5 border-white/10 text-foreground/70">
                                                                {t}
                                                            </Badge>
                                                        ))}
                                                        {project.tech.length > 4 && (
                                                            <Badge variant="outline" className="text-[10px] text-muted-foreground border-white/10">+{project.tech.length - 4}</Badge>
                                                        )}
                                                    </CardItem>
                                                </CardFooter>
                                            </CardItem>
                                        </CardBody>
                                    </CardContainer>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-32">
                        <h4 className="flex items-center gap-3 text-2xl font-bold mb-10 text-foreground">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <Trophy className="w-7 h-7 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                            </motion.div>
                            Achievements & Hackathons
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(DATA.certifications as any[]).map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="rounded-2xl glass-panel relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_5px_30px_rgba(139,92,246,0.15)] border-white/10 flex flex-col"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                                    {cert.image && (
                                        <div className="relative w-full h-48 overflow-hidden bg-white/5 border-b border-white/5">
                                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 mix-blend-overlay group-hover:mix-blend-normal" />
                                        </div>
                                    )}

                                    <div className="p-6 relative z-10 flex-1 flex flex-col">
                                        <h5 className="font-bold text-foreground mb-3 text-lg group-hover:text-primary transition-colors">{cert.title}</h5>
                                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 glass-panel w-fit">{cert.issuer}</Badge>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{cert.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
