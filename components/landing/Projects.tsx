"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, ExternalLink, Trophy, X } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

const ALL_TAG = "All";
const CATEGORIES = [ALL_TAG, "Full Stack", "Backend", "Frontend", "AI/ML"];

export function Projects() {
    const [activeCategory, setActiveCategory] = useState(ALL_TAG);
    const [selectedProject, setSelectedProject] = useState<typeof DATA.projects[0] | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedProject]);

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
                                    layoutId={`project-${project.title}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className={cn("h-full w-full cursor-pointer", getBentoClass(index))}
                                    onClick={() => setSelectedProject(project)}
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

                    {/* Expandable Project Modal Overlay */}
                    <AnimatePresence>
                        {selectedProject && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedProject(null)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 cursor-pointer"
                                />
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                                    <motion.div
                                        layoutId={`project-${selectedProject.title}`}
                                        className="w-full max-w-5xl max-h-[90vh] bg-background/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto relative"
                                    >
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md border border-white/10"
                                        >
                                            <X className="w-5 h-5 text-white" />
                                        </button>

                                        {/* Dynamic Visual Area with Noise */}
                                        <div className="relative h-64 md:h-96 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background border-b border-white/10 group">
                                            <div className="absolute inset-0 z-0 bg-grid-white/[0.03] pointer-events-none" />
                                            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                                            
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/20 blur-[80px] group-hover:bg-primary/40 group-hover:blur-[100px] transition-all duration-700"></div>
                                                <h4 className="text-4xl md:text-6xl font-black text-white/50 tracking-tighter absolute drop-shadow-2xl mix-blend-overlay uppercase text-center px-4">{selectedProject.title}</h4>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6 md:p-10 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                                <div>
                                                    <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">{selectedProject.title}</h3>
                                                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl font-light">{selectedProject.description}</p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
                                                    {"caseStudySlug" in selectedProject && selectedProject.caseStudySlug && (
                                                        <Button
                                                            asChild
                                                            size="lg"
                                                            variant="outline"
                                                            className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 font-bold px-8"
                                                        >
                                                            <Link
                                                                href={`/case-studies/${selectedProject.caseStudySlug}`}
                                                                onClick={() => setSelectedProject(null)}
                                                            >
                                                                <BookOpen className="w-4 h-4" />
                                                                Case study
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                                                        <Button size="lg" className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold group px-8">
                                                            View Live Site
                                                            <ExternalLink className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                        </Button>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="mb-10">
                                                <h4 className="text-xl font-bold mb-4 text-foreground/90">Key Metrics & Features</h4>
                                                <ul className="space-y-4">
                                                    {selectedProject.metrics.map((metric, i) => (
                                                        <li key={i} className="flex gap-4 items-start text-muted-foreground/90 leading-relaxed">
                                                            <div className="mt-2 w-2 h-2 rounded-full bg-primary/70 shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                                                            <span className="text-base">{metric}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Tech Stack Marquee Footer */}
                                        <div className="h-16 md:h-20 border-t border-white/10 bg-black/40 flex items-center overflow-hidden flex-shrink-0 relative">
                                            <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>
                                            <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>
                                            
                                            <motion.div 
                                                className="flex whitespace-nowrap items-center gap-8 px-4"
                                                animate={{ x: ["0%", "-50%"] }}
                                                transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                                            >
                                                {/* Duplicate the array to create a seamless infinite scroll loop */}
                                                {[...selectedProject.tech, ...selectedProject.tech, ...selectedProject.tech, ...selectedProject.tech].map((t, i) => (
                                                    <span key={`${t}-${i}`} className="text-sm md:text-base font-mono font-medium text-foreground/60 uppercase tracking-wider flex items-center gap-8">
                                                        {t}
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                                    </span>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </AnimatePresence>

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
