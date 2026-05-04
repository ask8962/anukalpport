"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/lib/data";

export function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} id="experience" className="relative bg-background" style={{ height: `${Math.max(DATA.experience.length, 1) * 100}vh` }}>
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center max-w-6xl mx-auto px-6">
                
                {/* Background Effects */}
                <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />
                <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col lg:flex-row gap-12 items-center">
                    
                    {/* Left side: Timeline Progress & Title */}
                    <div className="w-full lg:w-1/3 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center mb-8 lg:mb-0">
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground lg:mb-12 uppercase">
                            Experience<span className="text-primary font-serif italic lowercase tracking-normal">.</span>
                        </h3>
                        
                        <div className="hidden lg:block relative h-[50vh] w-1 bg-white/5 rounded-full ml-6">
                            <motion.div 
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                            />
                            
                            {/* Nodes */}
                            {DATA.experience.map((_, i) => {
                                const step = 1 / Math.max(1, (DATA.experience.length - 1));
                                const progressAtNode = i * step;
                                
                                const opacity = useTransform(scrollYProgress, 
                                    [Math.max(0, progressAtNode - 0.1), progressAtNode, Math.min(1, progressAtNode + 0.1)], 
                                    [0.2, 1, 0.2]
                                );
                                
                                const scale = useTransform(scrollYProgress, 
                                    [Math.max(0, progressAtNode - 0.1), progressAtNode, Math.min(1, progressAtNode + 0.1)], 
                                    [1, 1.5, 1]
                                );

                                return (
                                    <motion.div 
                                        key={i}
                                        className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary left-1/2 -translate-x-1/2"
                                        style={{ 
                                            top: DATA.experience.length === 1 ? '50%' : `${(i / (DATA.experience.length - 1)) * 100}%`,
                                            opacity,
                                            scale,
                                            y: i === 0 ? 0 : i === DATA.experience.length - 1 ? "-100%" : "-50%"
                                        }}
                                    >
                                        <motion.div 
                                            className="absolute inset-0 rounded-full bg-primary"
                                            style={{ opacity }}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right side: Cinematic Content */}
                    <div className="w-full lg:w-2/3 relative h-[600px]">
                        {DATA.experience.map((exp, i) => {
                            const step = 1 / DATA.experience.length;
                            const start = i * step;
                            const end = start + step;

                            const opacity = useTransform(scrollYProgress, 
                                [start, start + 0.05, end - 0.05, end], 
                                [0, 1, 1, 0]
                            );
                            
                            const y = useTransform(scrollYProgress,
                                [start, start + 0.1, end - 0.1, end],
                                [100, 0, 0, -100]
                            );
                            
                            const scale = useTransform(scrollYProgress,
                                [start, start + 0.1, end - 0.1, end],
                                [0.9, 1, 1, 0.9]
                            );

                            return (
                                <motion.div 
                                    key={i}
                                    className="absolute inset-0 flex flex-col justify-center"
                                    style={{ opacity, y, scale }}
                                >
                                    <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden bg-black/60 backdrop-blur-xl">
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <span className="text-9xl font-serif italic text-primary">{i+1}</span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 relative z-10">
                                            <h4 className="text-3xl font-bold text-foreground">{exp.title}</h4>
                                            <span className="inline-block mt-3 sm:mt-0 text-sm font-mono text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                                                {exp.dates}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-1 mb-8 relative z-10">
                                            <span className="text-2xl font-serif italic text-foreground/90">{exp.company}</span>
                                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                                {exp.location}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed font-light relative z-10">{exp.description}</p>
                                        
                                        <ul className="space-y-4 relative z-10">
                                            {exp.highlights.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-muted-foreground/90">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
