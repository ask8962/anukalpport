"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DATA } from "@/lib/data";
import { Mail, Linkedin, Send } from "lucide-react";

import { SparklesCore } from "@/components/ui/sparkles";

export function Contact() {
    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />

            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 overflow-hidden mix-blend-overlay opacity-10">
                <h2 className="text-[15vw] font-black tracking-tighter text-white whitespace-nowrap">
                    LET&apos;S TALK
                </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center h-full">

                <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10 relative group">
                    <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <Send className="text-white h-10 w-10 ml-1 group-hover:rotate-12 transition-transform duration-500 group-hover:text-primary" />
                </div>

                <motion.h3
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-foreground drop-shadow-sm uppercase leading-[0.85]"
                >
                    Build Something<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-500">Amazing.</span>
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-light leading-relaxed mix-blend-screen"
                >
                    I am actively looking for internship and full-time opportunities.
                    If you need an engineer who understands scale and pixel-perfect design, my inbox is open.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row justify-center gap-6 relative z-20 w-full sm:w-auto"
                >
                    <a href={`mailto:${DATA.personalInfo.email}`} className="group/btn relative">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/20 blur-xl group-hover/btn:bg-primary/40 transition-colors"></div>
                        <Button size="lg" className="relative w-full sm:w-auto h-16 px-10 text-xl font-bold rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-500 flex items-center gap-3">
                            <Mail className="h-6 w-6" />
                            Say Hello
                        </Button>
                    </a>

                    <a href={DATA.personalInfo.linkedin} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-xl font-bold rounded-full border-white/20 bg-black/50 backdrop-blur-max hover:bg-white/10 hover:text-white hover:border-white/40 hover:-translate-y-1 transition-all duration-500 flex items-center gap-3">
                            <Linkedin className="h-6 w-6" />
                            LinkedIn
                        </Button>
                    </a>
                </motion.div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-8 w-full text-center text-sm font-mono tracking-widest text-muted-foreground/40 uppercase">
                <p>Designed and Built by {DATA.personalInfo.name}</p>
            </div>
        </section>
    );
}
