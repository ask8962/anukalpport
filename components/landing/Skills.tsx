"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Magnetic } from "@/components/ui/magnetic";

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
                {/* Row 1 - Left to Right */}
                <div className="flex overflow-hidden relative w-full group py-4">
                    <div className="flex animate-marquee gap-6 pr-6 flex-nowrap shrink-0 group-hover:[animation-play-state:paused]" style={{ '--duration': '40s' } as React.CSSProperties}>
                        {row1.map((skill, index) => (
                            <Magnetic key={`row1-1-${skill}-${index}`}>
                                <div className="px-8 py-4 glass-panel rounded-2xl text-foreground font-semibold whitespace-nowrap border-white/10 hover:text-primary transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] text-lg cursor-pointer">
                                    {skill}
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                    <div className="flex animate-marquee gap-6 pr-6 flex-nowrap shrink-0 group-hover:[animation-play-state:paused]" style={{ '--duration': '40s' } as React.CSSProperties} aria-hidden="true">
                        {row1.map((skill, index) => (
                            <Magnetic key={`row1-2-${skill}-${index}`}>
                                <div className="px-8 py-4 glass-panel rounded-2xl text-foreground font-semibold whitespace-nowrap border-white/10 hover:text-primary transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] text-lg cursor-pointer">
                                    {skill}
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right to Left (Reverse) */}
                <div className="flex overflow-hidden relative w-full group py-4">
                    <div className="flex animate-marquee gap-6 pr-6 flex-nowrap shrink-0 group-hover:[animation-play-state:paused] [animation-direction:reverse]" style={{ '--duration': '45s' } as React.CSSProperties}>
                        {row2.map((skill, index) => (
                            <Magnetic key={`row2-1-${skill}-${index}`}>
                                <div className="px-8 py-4 glass-panel rounded-2xl text-foreground font-semibold whitespace-nowrap border-white/10 hover:text-accent transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-lg cursor-pointer">
                                    {skill}
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                    <div className="flex animate-marquee gap-6 pr-6 flex-nowrap shrink-0 group-hover:[animation-play-state:paused] [animation-direction:reverse]" style={{ '--duration': '45s' } as React.CSSProperties} aria-hidden="true">
                        {row2.map((skill, index) => (
                            <Magnetic key={`row2-2-${skill}-${index}`}>
                                <div className="px-8 py-4 glass-panel rounded-2xl text-foreground font-semibold whitespace-nowrap border-white/10 hover:text-accent transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-lg cursor-pointer">
                                    {skill}
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
