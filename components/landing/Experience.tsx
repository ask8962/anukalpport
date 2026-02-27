"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export function Experience() {
    return (
        <section id="experience" className="py-32 bg-background relative overflow-hidden min-h-screen">
            <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />
            <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-start gap-4 mb-20"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/20 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            <Briefcase className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">Experience</h3>
                    </div>
                </motion.div>

                {/* Aceternity Tracing Beam Timeline */}
                <TracingBeam className="px-2 md:px-6">
                    <div className="space-y-16 pl-4 md:pl-8">
                        {DATA.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                                    <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.title}</h4>
                                    <span className="inline-block mt-2 sm:mt-0 text-sm font-mono text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.15)]">
                                        {exp.dates}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 mb-6">
                                    <span className="text-xl font-semibold text-foreground/90">{exp.company}</span>
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                                        {exp.location}
                                    </span>
                                </div>

                                <motion.div
                                    className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-primary/30 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)]"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
                                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed relative z-10 font-light">{exp.description}</p>
                                    <ul className="space-y-4 relative z-10">
                                        {exp.highlights.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-muted-foreground/90">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_5px_rgba(139,92,246,0.8)]" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </TracingBeam>
            </div>
        </section>
    );
}
