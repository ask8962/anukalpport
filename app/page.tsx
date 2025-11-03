"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  MapPin,
  Download,
  Eye,
  Code,
  Palette,
  Zap,
  Heart,
  Award,
  Send,
  Shield,
  FileText,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Briefcase,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Certification = {
  title: string
  subtitle: string
  issuer: string
  date: string
  image: string
  gradient: string
}

type Project = {
  title: string
  url: string
  liveUrl?: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  gradient: string
  icon: React.ReactNode
  impact?: string
  featured?: boolean
  githubUrl?: string
  stats?: { label: string; value: string }[]
}

type Experience = {
  title: string
  company: string
  date: string
  description: string
  highlights: string[]
  icon: React.ReactNode
  gradient: string
}

export default function PremiumPortfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  // State for certificate lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // --- Event Listeners Setup ---
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300)

    const sections = ["hero", "about", "experience", "projects", "certifications", "skills", "contact"]
    const current = sections.find((section) => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        // Adjust threshold to accurately detect when a section becomes active
        return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.1
      }
      return false
    })
    if (current) setActiveSection(current)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  // --- End Event Listeners Setup ---

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200) // Reduced from 1500ms
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/anukalp-gupta-resume.pdf"
    link.download = "Anukalp-Gupta-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const projects: Project[] = [
    {
      title: "GLA Exam Portal",
      url: "https://glaexamportal.site/",
      liveUrl: "https://glaexamportal.site/",
      description: "Full-featured online exam platform with real-time monitoring and analytics",
      longDescription:
        "Built a comprehensive exam platform serving 500+ students with real-time proctoring, instant results, and detailed analytics dashboard. Implemented WebSocket for live monitoring and Firebase for secure data management.",
      tech: ["React.js", "Firebase", "Node.js", "WebSocket"],
      image: "/online-exam-platform.jpg",
      gradient: "from-blue-500 to-purple-600",
      icon: <Code className="h-6 w-6" />,
      impact: "500+ students",
      featured: true,
      stats: [
        { label: "Active Users", value: "500+" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
    {
      title: "Anup Gupta Shop",
      url: "https://anugupta.shop/",
      liveUrl: "https://anugupta.shop/",
      description: "Lightweight e-commerce platform with modern shopping experience",
      longDescription:
        "Created a high-performance e-commerce store with optimized checkout flow, inventory management, and integrated payment processing. Achieved 98% Lighthouse score through careful optimization.",
      tech: ["HTML", "CSS", "JavaScript", "Netlify CMS"],
      image: "/ecommerce-shop.jpg",
      gradient: "from-green-500 to-teal-600",
      icon: <Palette className="h-6 w-6" />,
      impact: "50+ SKUs",
      featured: true,
      stats: [
        { label: "Lighthouse", value: "98%" },
        { label: "Load Time", value: "1.2s" },
      ],
    },
    {
      title: "GLA Skill Swap",
      url: "https://skilleu.vercel.app/",
      liveUrl: "https://skilleu.vercel.app/",
      description: "AI-powered campus gig marketplace connecting students",
      longDescription:
        "Developed a micro-task marketplace enabling 200+ students to monetize skills. Integrated GPT API for skill matching and Firebase for real-time updates with Vercel deployment.",
      tech: ["FlutterFlow", "Firebase", "GPT API", "Vercel"],
      image: "/skill-marketplace.jpg",
      gradient: "from-purple-500 to-pink-600",
      icon: <Zap className="h-6 w-6" />,
      impact: "200+ users",
      stats: [
        { label: "Active Users", value: "200+" },
        { label: "Tasks Posted", value: "500+" },
      ],
    },
    {
      title: "Safeguard Blockchain",
      url: "https://safeguardblockchain.vercel.app/",
      liveUrl: "https://safeguardblockchain.vercel.app/",
      description: "Security-first blockchain dashboard and tooling",
      longDescription:
        "Engineered a blockchain security dashboard with real-time transaction monitoring, wallet integration, and smart contract interaction. Designed with accessibility and performance as top priorities.",
      tech: ["Next.js", "TailwindCSS", "TypeScript", "Web3.js"],
      image: "/blockchain-dashboard.jpg",
      gradient: "from-emerald-500 to-teal-600",
      icon: <Shield className="h-6 w-6" />,
      impact: "Secure & Fast",
      featured: true,
      stats: [
        { label: "Response Time", value: "<100ms" },
        { label: "Security Score", value: "A+" },
      ],
    },
    {
      title: "Mandir Porsa",
      url: "https://mandirporsa.netlify.app/",
      liveUrl: "https://mandirporsa.netlify.app/",
      description: "Community-focused religious information portal",
      longDescription:
        "Built a community portal providing religious information and event management. Features include event scheduling, community forum, and responsive design serving diverse users.",
      tech: ["HTML", "JavaScript", "Bootstrap", "Netlify"],
      image: "/community-portal.jpg",
      gradient: "from-orange-500 to-red-600",
      icon: <Heart className="h-6 w-6" />,
      impact: "Community-driven",
      stats: [
        { label: "Monthly Visitors", value: "1K+" },
        { label: "Events Hosted", value: "50+" },
      ],
    },
    {
      title: "AI PPTX Generator",
      url: "https://aipptx1.vercel.app/",
      liveUrl: "https://aipptx1.vercel.app/",
      description: "Generate presentation slides with AI in seconds",
      longDescription:
        "Created an AI-powered tool that generates complete presentations from simple prompts. Integrated OpenAI API with Next.js and implemented real-time slide generation with live preview.",
      tech: ["Next.js", "OpenAI", "TailwindCSS", "React"],
      image: "/ai-presentation-generator.jpg",
      gradient: "from-fuchsia-500 to-purple-600",
      icon: <FileText className="h-6 w-6" />,
      impact: "AI-Powered",
      featured: true,
      stats: [
        { label: "Generations/Day", value: "100+" },
        { label: "Users", value: "50+" },
      ],
    },
  ]

  const certifications: Certification[] = [
    {
      title: "Micro IT Internship",
      subtitle: "1-Month Web Dev Internship",
      issuer: "Micro Information Technology Services",
      date: "June 2025",
      image: "/images/micro-it-certificate.jpeg",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Empowering Education Through Technology",
      subtitle: "Technology in Education",
      issuer: "Educational Institution",
      date: "August 2024",
      image: "/images/education-certificate.png",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Edumagma Achievement",
      subtitle: "Software Engineer | Making Magic",
      issuer: "Edumagma",
      date: "March 2025",
      image: "/images/edumagma-certificate.png",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "NPTEL: Environmental Engineering",
      subtitle: "Score: 62%",
      issuer: "IIT Kharagpur",
      date: "Jan-Apr 2025",
      image: "/images/nptel-certificate.jpeg",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Hack-a-Pirate of Oblivion'25",
      subtitle: "Hackathon Participation",
      issuer: "Netaji Subhas University of Technology (NSUT), Delhi",
      date: "2025",
      image: "/images/hack-a-pirate-nsut-certificate.png",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      title: "Ctrl+Space-powered by Quantique Metadata",
      subtitle: "Hackathon Participation",
      issuer: "Newton School of Technology, ADYPU Pune",
      date: "2025",
      image: "/images/ctrl-space-quantique-certificate.png",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Entrepreneurship Hackathon",
      subtitle: "STPI x Techniche, IIT Guwahati",
      issuer: "Indian Institute of Technology (IIT), Guwahati",
      date: "2025",
      image: "/images/entrepreneurship-hackathon-iit-certificate.png",
      gradient: "from-slate-600 to-slate-800",
    },
    {
      title: "Buildathon - Top 46",
      subtitle: "Certificate of Appreciation",
      issuer: "Bharati Vidyapeeth Institute of Management & Research (BVIMR), New Delhi",
      date: "23 September 2025",
      image: "/images/bvimr-buildathon-certificate.png",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      title: "Shri Ram Trading Challenge 2023",
      subtitle: "Certificate of Participation",
      issuer: "Shri Ram College of Commerce (SRCC), University of Delhi",
      date: "2023",
      image: "/images/shri-ram-trading-challenge-certificate.png",
      gradient: "from-pink-500 to-rose-600",
    },
  ]

  const skills = {
    frontend: [
      { name: "HTML", level: 95, color: "from-orange-400 to-orange-600" },
      { name: "CSS", level: 90, color: "from-blue-400 to-blue-600" },
      { name: "JavaScript", level: 88, color: "from-yellow-400 to-yellow-600" },
      { name: "React", level: 85, color: "from-cyan-400 to-cyan-600" },
      { name: "Tailwind", level: 82, color: "from-teal-400 to-teal-600" },
    ],
    backend: [
      { name: "Node.js", level: 80, color: "from-green-400 to-green-600" },
      { name: "Firebase", level: 85, color: "from-orange-400 to-red-600" },
      { name: "Supabase", level: 75, color: "from-emerald-400 to-emerald-600" },
      { name: "MySQL", level: 70, color: "from-blue-400 to-indigo-600" },
    ],
    languages: [
      { name: "C++", level: 85, color: "from-blue-400 to-purple-600" },
      { name: "C", level: 80, color: "from-gray-400 to-gray-600" },
      { name: "Java", level: 75, color: "from-red-400 to-orange-600" },
      { name: "Python", level: 70, color: "from-green-400 to-blue-600" },
    ],
    tools: [
      { name: "Git", level: 85, color: "from-orange-400 to-red-600" },
      { name: "VS Code", level: 90, color: "from-blue-400 to-cyan-600" },
      { name: "Cursor", level: 85, color: "from-purple-400 to-pink-600" },
      { name: "Vercel", level: 80, color: "from-gray-400 to-black" },
    ],
  }

  // added new Experience Timeline data
  const experiences: Experience[] = [
    {
      title: "Micro IT Internship",
      company: "Micro Information Technology Services",
      date: "June 2025",
      description:
        "1-month intensive web development internship focusing on modern frontend frameworks and responsive design.",
      highlights: [
        "Built responsive web applications using React",
        "Collaborated with senior developers on live projects",
        "Implemented pixel-perfect designs with TailwindCSS",
      ],
      icon: <Briefcase className="h-5 w-5" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Full-Stack Developer",
      company: "Self-Employed / Freelance",
      date: "2024 - Present",
      description:
        "Building and maintaining various full-stack projects with focus on user experience and performance optimization.",
      highlights: [
        "Developed 6+ production applications",
        "Implemented real-time features with WebSockets",
        "Integrated AI APIs for intelligent features",
      ],
      icon: <Code className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "CS Student & Developer",
      company: "GLA University",
      date: "2023 - 2027",
      description: "B.Tech in Computer Science with active participation in hackathons and coding competitions.",
      highlights: [
        "Participated in 3+ hackathons with placements",
        "Developed exam portal serving 500+ students",
        "Led technical workshops and mentoring sessions",
      ],
      icon: <Award className="h-5 w-5" />,
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white text-xl font-light"
          >
            Crafting Excellence...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""}`}>
      <motion.div
        className="fixed w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full pointer-events-none z-50 mix-blend-screen hidden lg:block will-change-transform"
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.3 }}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 transform-origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-xl z-40 border-b border-white/5 hover:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-red-500 tracking-wide"
            >
              AG
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group`}
                >
                  <span
                    className={`relative z-10 ${activeSection === item.id ? "text-white" : "text-gray-300 group-hover:text-white"}`}
                  >
                    {item.label}
                  </span>

                  {/* Animated underline background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: activeSection === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Hover effect underline */}
                  <motion.div
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Active indicator dot */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <motion.div initial={false} animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full text-white hover:bg-white/10 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group ${
                      activeSection === item.id
                        ? "bg-red-600/20 text-white ring-1 ring-red-600"
                        : "text-gray-300 hover:bg-white/5 hover:text-white active:bg-white/10"
                    }`}
                  >
                    <motion.div initial={{ x: 0 }} whileHover={{ x: 4 }} className="flex items-center space-x-2">
                      {activeSection === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 bg-red-500 rounded-full"
                        />
                      )}
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-8"
              >
                <Badge className="px-4 py-2 bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30">
                  Full-Stack Developer Available
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight text-balance"
              >
                Anukalp Gupta
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-2xl text-gray-300 mb-4 font-light text-balance"
              >
                Building beautiful, performant web experiences
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-lg text-gray-400 mb-12 max-w-xl leading-relaxed"
              >
                Full-stack developer specializing in React, Next.js, and modern web technologies. I create seamless user
                experiences with clean code and attention to detail.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-lg font-semibold text-base flex items-center justify-center gap-2"
                >
                  <Eye className="h-5 w-5" />
                  View Projects
                </Button>
                <Button
                  size="lg"
                  onClick={handleResumeDownload}
                  className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-lg font-semibold text-base flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Resume
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-6 rounded-lg font-semibold text-base flex items-center justify-center gap-2 bg-transparent"
                >
                  <Send className="h-5 w-5" />
                  Hire Me
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-12 md:gap-16 mt-16 pt-12 border-t border-gray-800"
              >
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-red-500">6+</p>
                  <p className="text-gray-400 text-sm mt-2">Projects Shipped</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-red-500">9</p>
                  <p className="text-gray-400 text-sm mt-2">Certifications</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-red-500">750+</p>
                  <p className="text-gray-400 text-sm mt-2">Hours Coded</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative justify-self-center lg:justify-self-end"
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl opacity-20 blur-2xl" />
                <img
                  src="/images/anukalp-photo.jpeg"
                  alt="Anukalp Gupta"
                  className="relative w-full h-full object-cover rounded-2xl ring-2 ring-red-600/50 shadow-2xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white text-balance">About Me</h2>
            <motion.div
              className="w-24 md:w-32 h-1 bg-red-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  I'm a passionate <span className="font-semibold text-red-500">full-stack developer</span> with a
                  strong foundation in web technologies. I believe in building clean, performant applications that solve
                  real problems and create meaningful user experiences.
                </p>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  With experience across the entire development lifecycle—from frontend design to backend
                  infrastructure—I excel at creating end-to-end solutions. My work spans educational platforms,
                  e-commerce systems, and blockchain applications.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-800/40 to-indigo-900/40 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm space-y-4"
              >
                <h4 className="text-lg font-bold text-red-400">Education</h4>
                <div className="space-y-3">
                  <p className="font-semibold text-gray-100 text-base">B.Tech in Computer Science and Engineering</p>
                  <p className="text-red-500 font-semibold">GLA University, Mathura</p>
                  <div className="flex justify-between text-sm text-gray-300 pt-3 border-t border-gray-700/50">
                    <span>2023 – 2027</span>
                    <span className="font-semibold">CPI: 6.8/10</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-800/40 to-slate-900/40 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm space-y-4"
              >
                <h4 className="text-lg font-bold text-red-400">Get In Touch</h4>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>Gwalior, India</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>ask8962@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>+91-8962393954</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white text-balance">Core Expertise</h3>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { name: "React", level: 90, icon: "⚛️" },
                  { name: "Next.js", level: 85, icon: "▲" },
                  { name: "JavaScript", level: 92, icon: "JS" },
                  { name: "TypeScript", level: 80, icon: "TS" },
                  { name: "Firebase", level: 88, icon: "🔥" },
                  { name: "UI/UX Design", level: 82, icon: "🎨" },
                  { name: "Node.js", level: 80, icon: "🟢" },
                  { name: "Problem Solving", level: 95, icon: "🧩" },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="p-5 bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/50 hover:border-red-600/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full">
                      <div className="text-center space-y-3">
                        <div className="text-4xl">{skill.icon}</div>
                        <h4 className="font-semibold text-sm text-white">{skill.name}</h4>
                        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: index * 0.08 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white text-balance">
              Experience & Journey
            </h2>
            <motion.div
              className="w-24 md:w-32 h-1 bg-red-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-lg md:text-xl text-gray-300 mt-10 max-w-3xl mx-auto leading-relaxed">
              My professional journey showcasing internships, freelance work, and academic growth
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500/50 via-red-600/30 to-red-500/50 top-0" />

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 md:gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <Card className="border-0 shadow-lg bg-gray-800/60 backdrop-blur-sm hover:shadow-xl hover:bg-gray-800/80 transition-all duration-500 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-2xl font-bold text-white mb-2">{exp.title}</CardTitle>
                            <div className="flex flex-wrap gap-3 items-center">
                              <p className="text-red-400 font-semibold">{exp.company}</p>
                              <Badge className="bg-red-600/20 text-red-300 border-red-600/50 flex items-center gap-1 px-3 py-1">
                                <Calendar className="h-3 w-3" />
                                {exp.date}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-red-400">Key Achievements:</p>
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 text-gray-300 text-sm"
                              >
                                <motion.div
                                  className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5"
                                  whileInView={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 0.6 }}
                                  viewport={{ once: true }}
                                />
                                <span>{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center w-12 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-white shadow-lg ring-4 ring-black`}
                    >
                      {exp.icon}
                    </motion.div>
                    {index < experiences.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="w-1 h-20 bg-gradient-to-b from-red-600 to-transparent mt-4"
                        style={{ originY: 0 }}
                      />
                    )}
                  </div>

                  {/* Mobile timeline indicator */}
                  <div className="md:hidden absolute left-0 top-0 w-12 h-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-white shadow-lg ring-4 ring-black text-sm`}
                    >
                      {exp.icon}
                    </motion.div>
                    <div className="absolute left-5 top-12 w-0.5 h-full bg-gradient-to-b from-red-600 to-transparent" />
                  </div>

                  {/* Mobile content spacing */}
                  <div className="md:hidden pl-16" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white text-balance">
              Featured Projects
            </h2>
            <motion.div
              className="w-24 md:w-32 h-1 bg-red-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-lg md:text-xl text-gray-300 mt-10 max-w-3xl mx-auto leading-relaxed">
              Showcasing my recent work across full-stack development, AI integration, and modern web technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-800/60 backdrop-blur-sm h-full flex flex-col">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative overflow-hidden flex-shrink-0">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="flex gap-3"
                      >
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.liveUrl || project.url, "_blank")
                          }}
                          className="bg-red-600 text-white hover:bg-red-700 shadow-lg"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Button>
                      </motion.div>
                    </div>

                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                      {project.featured && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="px-3 py-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg"
                        >
                          Featured
                        </motion.div>
                      )}
                    </div>

                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-full flex items-center justify-center text-white shadow-lg`}
                    >
                      {project.icon}
                    </div>
                  </div>

                  <CardHeader className="pb-4 flex-1 space-y-2">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                    {project.impact && <div className="pt-2 text-xs text-red-400 font-semibold">{project.impact}</div>}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {project.stats && project.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 p-3 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-lg border border-gray-700/30">
                        {project.stats.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                          >
                            <p className="text-red-400 font-bold text-sm">{stat.value}</p>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs font-medium bg-gray-700/50 text-red-300 border-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium bg-gray-700/50 text-gray-400 border-0"
                        >
                          +{project.tech.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications: horizontal Netflix-style row with snap and hidden scrollbar */}
      <section id="certifications" className="py-24 md:py-28 relative bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
              Certifications & Achievements
            </h2>
            <span className="text-sm text-gray-400 hidden sm:inline">Scroll →</span>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
            <div className="flex gap-6 snap-x snap-mandatory pb-4">
              {certifications.map((cert) => (
                <div key={cert.title} className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[36%]">
                  <Card className="relative overflow-hidden bg-card border border-white/10 hover:border-white/20 transition-colors cursor-pointer hover:-translate-y-2 h-full">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-lg"
                      aria-label={`View ${cert.title} certificate`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={cert.image || "/placeholder.svg"}
                          alt={`${cert.title} — ${cert.subtitle}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-semibold text-white line-clamp-1">{cert.title}</h3>
                          <Award className="h-5 w-5 text-red-500 flex-shrink-0" />
                        </div>
                        <p className="text-red-400 font-medium text-sm mb-1">{cert.subtitle}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 mt-2">{cert.date}</p>
                      </div>
                    </button>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white text-balance">
              Technical Expertise
            </h2>
            <motion.div
              className="w-24 md:w-32 h-1 bg-red-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.12 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-gray-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-lg font-bold capitalize text-white">
                      {category === "frontend"
                        ? "Frontend"
                        : category === "backend"
                          ? "Backend"
                          : category === "languages"
                            ? "Languages"
                            : "Tools & DevOps"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-7">
                    {skillList.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm text-white">{skill.name}</span>
                          <span className="text-xs text-gray-400 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="relative h-2.5 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-white text-balance">Soft Skills & Qualities</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Leadership",
                "Communication",
                "Problem-solving",
                "Team Collaboration",
                "Creative Thinking",
                "Adaptability",
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge className="px-5 py-2.5 text-sm font-medium border-2 border-red-600/50 hover:border-red-600 bg-red-600/10 hover:bg-red-600 text-red-300 hover:text-white transition-all duration-300 cursor-pointer">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white text-balance">Let's Connect</h2>
            <motion.div
              className="w-24 md:w-32 h-1 bg-red-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <p className="text-lg md:text-xl text-gray-300 mt-10 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing
              together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-gray-800/60 backdrop-blur-sm h-full">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold flex items-center text-white">
                    <Send className="mr-3 h-6 w-6 text-red-500" />
                    Send Message
                  </CardTitle>
                  <CardDescription className="text-base text-gray-300">
                    I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      className="border-2 border-gray-700 focus:border-red-600 transition-colors bg-gray-900/50 text-white rounded-lg"
                    />
                    <Input
                      placeholder="Last Name"
                      className="border-2 border-gray-700 focus:border-red-600 transition-colors bg-gray-900/50 text-white rounded-lg"
                    />
                  </div>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="border-2 border-gray-700 focus:border-red-600 transition-colors bg-gray-900/50 text-white rounded-lg"
                  />
                  <Input
                    placeholder="Subject"
                    className="border-2 border-gray-700 focus:border-red-600 transition-colors bg-gray-900/50 text-white rounded-lg"
                  />
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    className="border-2 border-gray-700 focus:border-red-600 transition-colors bg-gray-900/50 resize-none text-white rounded-lg"
                  />
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10 flex flex-col justify-center"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">Quick Links</h3>
                <div className="space-y-4">
                  <motion.a
                    href="mailto:ask8962@gmail.com"
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-5 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-gray-300 text-sm truncate">ask8962@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+918962393954"
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-5 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">Phone</p>
                      <p className="text-gray-300 text-sm">+91-8962393954</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-8 text-white">Follow Me</h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/ask8962"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors text-white group"
                  >
                    <Github className="h-6 w-6 group-hover:text-red-500 transition-colors" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/anukalp-gupta-23b4b7319/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors text-white group"
                  >
                    <Linkedin className="h-6 w-6 group-hover:text-red-500 transition-colors" />
                  </motion.a>
                  <motion.a
                    href="mailto:ask8962@gmail.com"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors text-white group"
                  >
                    <Mail className="h-6 w-6 group-hover:text-red-500 transition-colors" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all text-white w-12 h-12"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-2xl p-6 border-0 bg-gray-900/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-gray-400 text-base mt-2">
              {selectedProject?.longDescription}
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6 mt-6">
              {selectedProject.stats && selectedProject.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-lg border border-gray-700/50">
                  {selectedProject.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-red-500 font-bold text-lg">{stat.value}</p>
                      <p className="text-sm text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <Badge key={tech} className="bg-red-600/20 text-red-300 border-red-600/50">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Button
                onClick={() => window.open(selectedProject.liveUrl || selectedProject.url, "_blank")}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Visit Live Demo
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Certificate Lightbox */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="sm:max-w-3xl p-0 border-0 bg-transparent shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Certificate View</DialogTitle>
            <DialogDescription>View certificate image</DialogDescription>
          </DialogHeader>
          {selectedCert && (
            <img
              src={selectedCert.image || "/placeholder.svg"}
              alt={`${selectedCert.title} — ${selectedCert.subtitle}`}
              className="w-full h-auto object-contain max-h-[80vh] rounded-lg"
            />
          )}
          <button
            type="button"
            onClick={() => setSelectedCert(null)}
            aria-label="Close certificate view"
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }
}
