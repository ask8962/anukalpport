
import { Github, Linkedin, Mail, FileText, Code, Database, Server, Smartphone, Globe } from "lucide-react";

export const DATA = {
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
    resumeUrl: "/anukalp-gupta-resume.pdf",
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
        "Implemented MongoDB aggregation pipelines for complex data processing.",
        "Resolved critical CORS and HttpOnly cookie authentication issues."
      ]
    },
    {
      title: "GLA Gallery",
      description: "Real-time Campus Event Platform.",
      dates: "Nov 2024",
      tech: ["Next.js", "Firebase", "TypeScript", "Real-time"],
      link: "https://glagallery.vercel.app",
      metrics: [
        "Currently serving 100+ students for campus event updates.",
        "Implemented real-time data synchronization using Firestore listeners.",
        "Secured database with custom Firestore security rules to prevent unauthorized access."
      ]
    }
  ],

  certifications: [
    {
      title: "Hack-a-Pirate, Oblivion'25",
      issuer: "Top 5 Finalist (National Level)",
      description: "Built real-time system in 24-hour hackathon."
    },
    {
      title: "Buildathon 2025",
      issuer: "Finalist (Innovation Challenge)",
      description: "Presented scalable architecture for EdTech solution."
    },
    {
      title: "Entrepreneurship Hackathon",
      issuer: "Participant",
      description: "STPI x Techniche, IIT Guwahati."
    }
  ]
};
