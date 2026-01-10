"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Filter } from "lucide-react";
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
        <section id="projects" className="py-32 bg-background border-t border-border/40 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight mb-2">Featured Projects</h3>
                            <p className="text-muted-foreground text-lg">Real-world applications focusing on performance & scale.</p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2 p-1 bg-secondary/30 rounded-lg border border-border/50">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                        activeCategory === cat
                                            ? "bg-background shadow-sm text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                    )}
                                >
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
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="flex flex-col h-full border-border/50 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 dark:hover:border-primary/20 overflow-hidden group">
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</CardTitle>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 -mr-2 -mt-2 rounded-full hover:bg-secondary transition-colors">
                                                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                                </a>
                                            </div>
                                            <CardDescription className="text-sm mt-2 line-clamp-2 leading-relaxed h-[40px]">{project.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1 pb-4">
                                            <div className="space-y-4">
                                                <div className="space-y-2 pt-2">
                                                    {project.metrics.slice(0, 3).map((metric, i) => ( // limit metrics to 3 for card balance
                                                        <div key={i} className="flex gap-2 items-start text-xs text-muted-foreground/90 leading-tight">
                                                            <span className="mt-1 w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                                                            <span>{metric}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex-col items-start gap-3 pt-4 border-t border-border/30 bg-secondary/5 mt-auto">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.slice(0, 4).map((t) => ( // Limit tags to 4
                                                    <Badge key={t} variant="secondary" className="font-mono text-[10px] uppercase font-medium bg-secondary/50 hover:bg-secondary px-2">
                                                        {t}
                                                    </Badge>
                                                ))}
                                                {project.tech.length > 4 && (
                                                    <Badge variant="outline" className="text-[10px] text-muted-foreground">+{project.tech.length - 4}</Badge>
                                                )}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-24">
                        <h4 className="flex items-center gap-2 text-xl font-bold mb-8">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            Achievements & Hackathons
                        </h4>
                        <div className="grid md:grid-cols-3 gap-6">
                            {DATA.certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 rounded-xl border border-border/50 bg-background/50 hover:bg-secondary/30 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h5 className="font-bold text-foreground mb-2">{cert.title}</h5>
                                    <Badge variant="outline" className="mb-3 border-primary/20 text-primary bg-primary/5">{cert.issuer}</Badge>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
