"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-secondary/50">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold mb-12">Technical Skills</h3>

                    <div className="grid gap-8 md:grid-cols-2">

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Languages</h4>
                            <div className="flex flex-wrap gap-2">
                                {DATA.skills.languages.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-base py-1 px-3 bg-background hover:bg-background/80 transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Backend & Cloud</h4>
                            <div className="flex flex-wrap gap-2">
                                {DATA.skills.backend.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-base py-1 px-3 bg-background hover:bg-background/80 transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                                {DATA.skills.databases.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-base py-1 px-3 bg-background hover:bg-background/80 transition-colors border-blue-500/20">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tools & DevOps</h4>
                            <div className="flex flex-wrap gap-2">
                                {DATA.skills.tools.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-base py-1 px-3 bg-background hover:bg-background/80 transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Core Engineering</h4>
                            <div className="flex flex-wrap gap-2">
                                {DATA.skills.core.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-base py-1 px-3">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
