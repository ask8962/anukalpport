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

    const getBentoClass = (index: number) => {
        // Create an organic, asymmetric grid layout out of 3 columns
        switch (index % 7) {
            case 0: return "md:col-span-2 md:row-span-2 min-h-[400px]"; // Massive Feature
            case 1: return "md:col-span-1 md:row-span-1 min-h-[250px]"; // Regular block next to feature
            case 2: return "md:col-span-1 md:row-span-1 min-h-[250px]"; // Regular block next to feature
            case 3: return "md:col-span-2 md:row-span-1 min-h-[300px]"; // Wide horizontal block
            case 4: return "md:col-span-1 md:row-span-2 min-h-[400px]"; // Tall vertical tower
            case 5: return "md:col-span-1 md:row-span-1 min-h-[250px]"; // Fill block
            case 6: return "md:col-span-1 md:row-span-1 min-h-[250px]"; // Fill block
            default: return "md:col-span-1 md:row-span-1";
        }
    };

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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px] md:auto-rows-[minmax(0,_1fr)]">

                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className={cn("h-full w-full", getBentoClass(index))}
                                >
                                    <CardContainer className="h-full w-full" containerClassName="py-0 flex items-stretch h-full w-full">
                                        <CardBody className="w-full h-full flex group/bento">
                                            <CardItem translateZ="20" className="flex flex-col h-full w-full glass-panel relative overflow-hidden transition-all duration-700 hover:shadow-[0_10px_60px_rgba(139,92,246,0.3)] hover:border-primary/50 border-white/5 rounded-3xl bg-black/40">

                                                {/* Liquid Hover Reveal background */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700 z-0 pointer-events-none mix-blend-screen mask-radial-gradient"></div>

                                                <CardHeader className="pb-4 relative z-10 flex-shrink-0">
                                                    <div className="flex justify-between items-start">
                                                        <CardItem translateZ="40">
                                                            <CardTitle className="text-2xl font-bold text-foreground group-hover/bento:text-primary transition-colors duration-300 tracking-tight">{project.title}</CardTitle>
                                                        </CardItem>
                                                        <CardItem translateZ="50" as="a" href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 -mr-2 -mt-2 rounded-full hover:bg-white/10 transition-colors z-20 backdrop-blur-sm bg-white/[0.02] border border-white/10 group-hover/bento:border-primary/50">
                                                            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover/bento:text-foreground group-hover/bento:rotate-12 transition-all duration-300" />
                                                        </CardItem>
                                                    </div>
                                                    <CardItem translateZ="30">
                                                        <CardDescription className="text-sm mt-3 line-clamp-3 md:line-clamp-4 leading-relaxed text-muted-foreground/80 font-light">{project.description}</CardDescription>
                                                    </CardItem>
                                                </CardHeader>
                                                <CardContent className="flex-1 pb-4 relative z-10 flex flex-col justify-end">
                                                    <CardItem translateZ="20" className="space-y-4 w-full">
                                                        <div className="space-y-3 pt-2">
                                                            {project.metrics.slice(0, index === 0 ? 3 : 2).map((metric, i) => (
                                                                <div key={i} className="flex gap-3 items-start text-xs text-muted-foreground/90 leading-tight">
                                                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                                                                    <span>{metric}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardItem>
                                                </CardContent>
                                                <CardFooter className="flex-col items-start gap-4 pt-5 border-t border-white/5 bg-black/30 mt-auto relative z-10 flex-shrink-0 w-full backdrop-blur-xl">
                                                    <CardItem translateZ="40" className="flex flex-wrap gap-2">
                                                        {project.tech.map((t) => (
                                                            <Badge key={t} variant="secondary" className="font-mono text-[10px] uppercase font-medium bg-white/5 hover:bg-white/10 px-2.5 py-1 border-white/10 text-foreground/80">
                                                                {t}
                                                            </Badge>
                                                        ))}
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
