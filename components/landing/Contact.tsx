"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DATA } from "@/lib/data";
import { Mail, Linkedin, Send } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="glass-panel border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(139,92,246,0.5)] rotate-3 group-hover:rotate-12 transition-transform duration-500">
                        <Send className="text-primary h-8 w-8" />
                    </div>

                    <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-foreground drop-shadow-sm">Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">amazing.</span></h3>

                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        I am actively looking for internship and full-time opportunities.
                        If you are looking for a backend engineer who understands scale and performance, my inbox is always open.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-20">
                        <a href={`mailto:${DATA.personalInfo.email}`}>
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:-translate-y-1 transition-all duration-300">
                                <Mail className="mr-3 h-5 w-5" />
                                Say Hello
                            </Button>
                        </a>
                        <a href={DATA.personalInfo.linkedin} target="_blank" rel="noreferrer">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 hover:bg-white/10 hover:text-foreground hover:-translate-y-1 transition-all duration-300">
                                <Linkedin className="mr-3 h-5 w-5" />
                                Let's Connect
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-6 w-full text-center text-sm text-muted-foreground/60">
                <p>Designed and Built by {DATA.name}.</p>
            </div>
        </section>
    );
}
