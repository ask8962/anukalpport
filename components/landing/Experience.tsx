"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Briefcase } from "lucide-react";

export function Experience() {
    return (
        <section id="experience" className="py-24 bg-background/50">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-12">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold">Experience</h3>
                </div>

                <div className="relative border-l-2 border-border/40 ml-4 md:ml-12 space-y-16">
                    {DATA.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative pl-8 md:pl-12 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Timeline Dot with Pulse Effect */}
                            <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_0_6px_rgba(59,130,246,0.2)]" />

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                                <h4 className="text-2xl font-bold text-foreground">{exp.title}</h4>
                                <span className="inline-block mt-2 sm:mt-0 text-sm font-mono text-primary/80 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                                    {exp.dates}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 mb-6">
                                <span className="text-lg font-medium text-foreground/80">{exp.company}</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    {exp.location}
                                </span>
                            </div>

                            <div className="bg-secondary/5 rounded-xl p-6 border border-border/50 hover:bg-secondary/10 transition-colors">
                                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{exp.description}</p>
                                <ul className="space-y-3">
                                    {exp.highlights.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-muted-foreground/90">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
