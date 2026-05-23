
import { HeroKernel } from "@/components/immersive/HeroKernel";
import { ProofRail } from "@/components/immersive/ProofRail";
import { About } from "@/components/landing/About";
import { Skills } from "@/components/landing/Skills";
import { Experience } from "@/components/landing/Experience";
import { ProjectChapters } from "@/components/landing/ProjectChapters";
import { Contact } from "@/components/landing/Contact";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Navbar />
      <HeroKernel />
      <ProofRail />
      <About />
      <Experience />
      <ProjectChapters />
      <Skills />
      <Contact />

      <footer className="w-full py-6 text-center text-sm text-muted-foreground border-t border-border/50">
        <p className="font-mono text-xs tracking-wider">
          © {new Date().getFullYear()} Anukalp Gupta · KERNEL · Next.js
        </p>
      </footer>
    </main>
  );
}
