"use client";

import { Button } from "@/components/ui/button";
import { DATA } from "@/lib/data";
import { Mail, Linkedin, Github } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-secondary/30 border-t border-border/50">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-lg text-muted-foreground mb-8 text-balance">
                    I am actively looking for internship and full-time opportunities.
                    If you are looking for a backend engineer who understands scale, let's chat.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href={`mailto:${DATA.personalInfo.email}`}>
                        <Button size="lg" className="w-full sm:w-auto">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                        </Button>
                    </a>
                    <a href={DATA.personalInfo.linkedin} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}
