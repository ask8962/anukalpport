
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Skills } from "@/components/landing/Skills";
import { Experience } from "@/components/landing/Experience";
import { Projects } from "@/components/landing/Projects";
import { Contact } from "@/components/landing/Contact";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />

      <footer className="w-full py-6 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© {new Date().getFullYear()} Anukalp Gupta. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}
