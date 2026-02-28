"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Skills() {
    const row1 = [...DATA.skills.languages, ...DATA.skills.core];
    const row2 = [...DATA.skills.backend, ...DATA.skills.databases, ...DATA.skills.tools];

    return (
        <section id="skills" className="py-32 bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-20 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center"
                >
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground text-center">Tech Arsenal</h3>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Tools and technologies I use to build robust & scalable products.</p>
                </motion.div>
            </div>

            <div className="relative z-10 flex flex-col gap-6 w-full -rotate-2 scale-105">
                {/* Draggable Physics Playground */}
                <div className="relative w-[120%] -ml-[10%] h-[600px] border border-white/5 rounded-[3rem] overflow-hidden bg-white/[0.01] backdrop-blur-3xl shadow-inner flex items-center justify-center p-12">

                    {/* The bounds constraint ref */}
                    <div className="absolute inset-0 z-0" id="skills-bounds" />

                    <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-5xl h-full relative z-10 z-[9999] pointer-events-auto">
                        {[...row1, ...row2].map((skill, index) => {
                            // Assign random initial float properties
                            const isCore = row1.includes(skill);
                            const floatDuration = 4 + (index % 5);
                            const floatDistance = 15 + (index % 10);

                            return (
                                <motion.div
                                    key={skill}
                                    drag
                                    dragConstraints={{ top: -250, bottom: 250, left: -400, right: 400 }}
                                    dragElastic={0.2}
                                    dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
                                    whileTap={{ cursor: "grabbing", scale: 0.95 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileDrag={{ zIndex: 50, scale: 1.15, rotate: 5 }}
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    animate={{
                                        y: [0, -floatDistance, 0],
                                    }}
                                    // @ts-ignore
                                    transition={{
                                        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className={cn(
                                        "px-6 py-4 rounded-full text-lg cursor-grab select-none shadow-2xl glass-panel relative overflow-hidden group/orb border",
                                        isCore ? "border-primary/30 text-primary-foreground bg-primary/10" : "border-accent/30 text-accent-foreground bg-accent/10"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/orb:opacity-100 transition-opacity"></div>
                                    <span className="relative z-10 font-bold tracking-tight mix-blend-screen">{skill}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Instructional text inside bounds */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground/50 text-sm font-mono tracking-widest uppercase pointer-events-none">
                        Drag to interact
                    </div>
                </div>
            </div>
        </section>
    );
}
