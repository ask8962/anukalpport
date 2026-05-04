"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Briefcase } from "lucide-react";

export function Experience() {
    return (
        <section id="experience" className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />
            <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-16 md:mb-24"
                >
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
                        Experience
                        <span className="text-primary font-serif italic lowercase tracking-normal">.</span>
                    </h3>
                    <p className="text-muted-foreground text-lg mt-4 max-w-xl">
                        My professional journey, building real-world systems at scale.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />

                    <div className="space-y-12 md:space-y-16">
                        {DATA.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                                className="relative pl-16 md:pl-20 group"
                            >
                                {/* Timeline node */}
                                <div className="absolute left-[14px] md:left-[22px] top-8 z-10">
                                    <div className="w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                                    </div>
                                </div>

                                {/* Card */}
                                <motion.div
                                    className="rounded-3xl p-8 md:p-10 border border-white/[0.06] relative overflow-hidden bg-white/[0.02] backdrop-blur-xl group-hover:border-primary/20 transition-all duration-500"
                                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                >
                                    {/* Background hover gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Watermark number */}
                                    <span className="absolute -top-6 -right-4 text-[12rem] leading-none font-serif italic text-white/[0.015] select-none pointer-events-none">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative z-10">
                                        <h4 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                                            {exp.title}
                                        </h4>
                                        <span className="mt-3 sm:mt-0 text-xs font-mono text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 whitespace-nowrap shadow-[0_0_10px_rgba(139,92,246,0.15)]">
                                            {exp.dates}
                                        </span>
                                    </div>

                                    {/* Company */}
                                    <div className="flex flex-col gap-0.5 mb-6 relative z-10">
                                        <span className="text-xl md:text-2xl font-serif italic text-foreground/90">
                                            {exp.company}
                                        </span>
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
                                            {exp.location}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground/80 mb-8 text-base md:text-lg leading-relaxed font-light relative z-10">
                                        {exp.description}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="space-y-3 relative z-10">
                                        {exp.highlights.map((item, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                                                className="flex items-start gap-3 text-muted-foreground/90 text-sm md:text-base"
                                            >
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.7)]" />
                                                <span className="leading-relaxed">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
