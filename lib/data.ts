import { Github, Linkedin, Mail, FileText, Code, Database, Server, Smartphone, Globe } from "lucide-react";

export const DATA = {
  name: "Anukalp Gupta",
  initials: "AG",
  personalInfo: {
    name: "Anukalp Gupta",
    role: "Backend Engineer",
    tagline: "Building scalable backend systems with Java, Spring Boot, and Cloud Architecture.",
    location: "Mathura, Uttar Pradesh",
    email: "ganukalp70@gmail.com",
    phone: "+91-8962393954",
    linkedin: "https://linkedin.com/in/anukalp-gupta",
    github: "https://github.com/ask8962",
    leetcode: "https://leetcode.com/u/anukalpgupta",
    resumeUrl: "/anukalpcv.pdf",
  },

  about: {
    summary: "B.Tech Computer Science student (2023-2027) with a strong focus on backend engineering and system design. Proficient in Java and Spring Boot ecosystems, with a track record of building performant, scalable applications. Experienced in optimizing database queries, implementing secure authentication systems, and handling high-concurrency workloads.",
    education: {
      degree: "Bachelor of Technology in Computer Science",
      university: "GLA University",
      location: "Mathura, Uttar Pradesh",
      dates: "Aug 2023 – May 2027",
      coursework: "Data Structures & Algorithms, OOP, Operating Systems, Computer Networks, DBMS",
      achievements: "Solved 200+ problems across LeetCode and GeeksforGeeks (Graphs, Trees, DP)."
    }
  },

  skills: {
    languages: ["Java (Proficient)", "SQL", "JavaScript", "TypeScript"],
    backend: ["Spring Boot", "Spring Security", "Maven", "REST API Design", "JWT Authentication", "Node.js", "Express.js"],
    databases: ["MongoDB", "MySQL", "Firebase Firestore"],
    tools: ["Git/GitHub", "Postman", "JMeter", "Vercel", "Cloudinary", "Gemini AI"],
    core: ["Data Structures & Algorithms", "System Design", "Database Optimization", "Operating Systems", "Computer Networks"]
  },

  experience: [
    {
      title: "Mobile App Development Intern",
      company: "W3 Grades",
      dates: "May 2025 – Sep 2025",
      location: "Mathura, India",
      description: "Developed cross-platform mobile applications and optimized API integrations.",
      highlights: [
        "Developed cross-platform mobile apps using Flutter and Dart with 5+ responsive UI screens and form validation.",
        "Integrated RESTful APIs and optimized network calls, reducing data fetch time by 30%.",
        "Collaborated with backend team to debug API payload mismatches.",
        "Implemented state management using Provider pattern in a 4-member Agile team."
      ]
    }
  ],

  projects: [
    {
      title: "JusticeAI",
      description: "Intelligent, multi-modal Consumer Scam Helpdesk designed to democratize legal access for online shoppers.",
      dates: "Feb 2026",
      tech: ["Next.js", "Twilio", "Upstash", "Sarvam AI", "Firebase"],
      link: "https://justiceaig.vercel.app/",
      metrics: [
        "Built a robust Developer API Platform with SHA-256 hashed API keys and a tiered quota system.",
        "Deployed an India-Scale WhatsApp bot via Twilio with voice-note and vernacular language support.",
        "Solved serverless timeout limitations (10s) using Upstash QStash for background queuing of LLM generation."
      ]
    },
    {
      title: "AI Code Explainer",
      description: "Intelligent coding companion that instantly analyzes, explains, and optimizes code.",
      dates: "Feb 2026",
      tech: ["Next.js 14", "Groq (LLaMA 3.3)", "Three.js", "Tailwind CSS"],
      link: "https://gla-code-aa.vercel.app/",
      metrics: [
        "Provides instant explanations with a step-by-step logic breakdown for Python, Java, C++, and more.",
        "Performs real-time Big-O complexity analysis for Time and Space.",
        "Offers auto-optimization with one-click refactoring and tailored learning modes."
      ]
    },
    {
      title: "Indian College OS",
      description: "Comprehensive Student Management Platform built with robust backend architecture.",
      dates: "Jan 2025",
      tech: ["Java", "Spring Boot", "MongoDB", "Next.js", "JMeter"],
      link: "https://oscollege.vercel.app",
      metrics: [
        "Handled 15+ REST API endpoints; load tested with JMeter (200ms avg response for 100+ concurrent users).",
        "Architected normalized schema with 8 collections, RBAC, and JWT with refresh token rotation.",
        "Optimized MongoDB queries using compound indexes, reducing execution time from 800ms to 150ms.",
        "Implemented atomic operations for Attendance System ensuring data integrity."
      ]
    },
    {
      title: "GLA Exam Portal",
      description: "Academic Assessment System serving large student cohorts.",
      dates: "Oct 2024",
      tech: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
      link: "https://glaexamportal.site",
      metrics: [
        "Architected backend to handle 500+ users with role-based access control.",
        "Developed 12 RESTful APIs for exam scheduling and automated grade calculations.",
        "Implemented MongoDB aggregation pipelines for complex data processing."
      ]
    },
    {
      title: "MoodifyMe",
      description: "Emotion-Based Daily Planner with AI-curated task recommendations and emotional wellness tracking.",
      dates: "Feb 2026",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      link: "https://moodfindai.vercel.app/",
      metrics: [
        "Implemented an emotion-aware task management system capturing mood data via an emoji-based interface.",
        "Generates AI-powered personalized daily task suggestions based on emotional state and tracks trends visually.",
        "Secured email and Google OAuth authentication with real-time data sync using Firebase Firestore."
      ]
    },
    {
      title: "GLA Gallery",
      description: "Campus Memories & Event Management Platform for photo sharing, hackathons, and rewards.",
      dates: "Jan 2026",
      tech: ["Next.js 16", "TypeScript 5", "Firebase", "Upstash Redis", "Tailwind CSS"],
      link: "https://glagallery.vercel.app/",
      metrics: [
        "Built a comprehensive social platform with 24-hour stories, photo uploads, and a gamified points system.",
        "Developed a robust event hub supporting RSVP, QR ticketing, hackathon judging, and digital club management.",
        "Ensured security with @gla.ac.in email-only access, Upstash rate limiting, and 2FA protection."
      ]
    },
    {
      title: "FoodExpress",
      description: "Comprehensive food delivery web application built for tier 2/3 cities with real-time order tracking.",
      dates: "Dec 2025",
      tech: ["Next.js 14", "React", "Firebase", "Tailwind CSS", "TypeScript"],
      link: "https://foodexp.vercel.app/",
      metrics: [
        "Architected a complex multi-role system supporting Customers, Shopkeepers, Delivery Partners, and Admins.",
        "Implemented real-time live order tracking via Firebase listeners and integrated offline support with IndexedDB.",
        "Developed complete restaurant management features including menu CRUD, image uploads, and revenue analytics."
      ]
    }
  ],

  certifications: [
    {
      title: "India AI Impact Buildathon",
      issuer: "Top 2% National Finalist",
      description: "Recognized among top 2% from over 40,000+ participants across India for leveraging AI by HCL GUVI."
    },
    {
      title: "AI-NIRMAN Hackathon",
      issuer: "Participant/Builder",
      description: "Built JusticeAI, an intelligent scam helpdesk, leveraging Next.js, Twilio, and Sarvam AI.",
      image: "/certificates/ai-nirman.png"
    },
    {
      title: "Face the Future: Deepfake ML",
      issuer: "Participant",
      description: "Synergy '25 organised by International Institute of Information Technology (IIIT), Bangalore.",
      image: "/certificates/face-the-future.png"
    },
    {
      title: "Hack-a-Pirate, Oblivion'25",
      issuer: "Participant",
      description: "Organised by Netaji Subhas University of Technology (NSUT), Delhi.",
      image: "/certificates/hack-a-pirate.png"
    },
    {
      title: "Shri Ram Trading Challenge",
      issuer: "Participant",
      description: "Organised by Shri Ram College of Commerce (SRCC), University of Delhi (DU), Delhi.",
      image: "/certificates/srcc-trading.png"
    },
    {
      title: "Buildathon, BVIMR New Delhi",
      issuer: "Top 46",
      description: "Secured a position in the Top 46 at Buildathon conducted by BVIMR, New Delhi.",
      image: "/certificates/buildathon-bvimr.png"
    },
    {
      title: "Ctrl+Space",
      issuer: "Participant",
      description: "Powered by Quantique Metadata, organised by Newton School of Technology, ADYPU Pune.",
      image: "/certificates/ctrl-space.png"
    },
    {
      title: "NPTEL Online Certification (Elite)",
      issuer: "IIT Kharagpur",
      description: "Introduction to Environmental Engineering and Science - Fundamental and Sustainability Concepts (Score: 62%).",
      image: "/certificates/nptel-environmental.jpeg"
    },
    {
      title: "Web Development Intern",
      issuer: "Micro IT Services",
      description: "Successfully completed 1-Month Internship Program as Web Development Intern.",
      image: "/certificates/micro-it-internship.jpeg"
    },
    {
      title: "Loyal Legend of the Neural Realm",
      issuer: "ChatGPT",
      description: "Displayed unmatched dedication by messaging ChatGPT 15 times during downtime.",
      image: "/certificates/chatgpt-loyalty.png"
    },
    {
      title: "Software Engineer",
      issuer: "Edumagma",
      description: "Certificate of achievement for making magic at Edumagma.",
      image: "/certificates/edumagma-swe.png"
    },
    {
      title: "Empowering Education Through Technology",
      issuer: "Kavya Gupta",
      description: "Certificate of achievement for empowering education through technology.",
      image: "/certificates/empowering-education.png"
    }
  ]
};
