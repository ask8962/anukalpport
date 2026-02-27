"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { DATA } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl">
            <div
                className={cn(
                    "rounded-full transition-all duration-500 px-6 py-3 flex items-center justify-between border",
                    isScrolled
                        ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                        : "bg-transparent border-transparent"
                )}
            >
                <a href="#" className="flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="text-xl font-black tracking-tighter hover:text-primary transition-colors relative z-10">
                        {DATA.initials}
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center bg-white/5 px-8 py-2.5 rounded-full border border-white/5">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-semibold text-muted-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:block">
                    <a href={DATA.personalInfo.resumeUrl} download>
                        <Button size="sm" className="rounded-full bg-white/10 hover:bg-white/20 hover:text-white border border-white/10 font-semibold backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">Resume</Button>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors bg-white/5 rounded-full"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 w-full glass-panel border border-white/10 p-6 rounded-3xl md:hidden flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 z-0"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-lg font-medium text-muted-foreground hover:text-white hover:pl-2 transition-all duration-300 border-b border-white/5 pb-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a href={DATA.personalInfo.resumeUrl} download onClick={() => setMobileMenuOpen(false)} className="mt-4">
                                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12">Download Resume</Button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
