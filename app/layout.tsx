import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Bebas_Neue, Playfair_Display } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" })
const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic", "normal"], variable: "--font-serif", display: "swap" })
export const metadata: Metadata = {
  title: "Anukalp Gupta — Backend Engineer | Java, Spring Boot, SaaS & AI",
  description:
    "Backend engineer building multi-tenant SaaS, production REST APIs, and AI-integrated platforms. Java, Spring Boot, Firebase, Groq. 500+ users. Portfolio & case studies.",
  keywords: [
    "backend engineer",
    "Java developer",
    "Spring Boot",
    "multi-tenant SaaS",
    "system design",
    "Next.js",
    "Firebase",
    "Groq",
    "portfolio",
  ],
  authors: [{ name: "Anukalp Gupta", url: "https://anukalpeu.vercel.app" }],
  creator: "Anukalp Gupta",
  metadataBase: new URL("https://anukalpeu.vercel.app"),
  openGraph: {
    title: "Anukalp Gupta — Backend Engineer | Systems at Scale",
    description:
      "Multi-tenant SaaS, Spring Boot platforms, and AI products — 500+ users, 200+ DSA problems. Explore case studies and live systems.",
    type: "website",
    url: "https://anukalpeu.vercel.app",
    siteName: "Anukalp Gupta Portfolio",
    images: [
      {
        url: "/images/anukalp-photo.jpeg",
        width: 1200,
        height: 630,
        alt: "Anukalp Gupta — Backend Engineer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anukalp Gupta — Backend Engineer",
    description: "Production APIs, multi-tenant SaaS, and AI systems. Java · Spring Boot · Firebase · Groq.",
    images: ["/images/anukalp-photo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://anukalpeu.vercel.app",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  generator: 'v0.app'
}

import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anukalp Gupta",
    url: "https://anukalpeu.vercel.app",
    jobTitle: "Backend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed",
    },
    sameAs: ["https://github.com/ask8962", "https://www.linkedin.com/in/anukalp-gupta-23b4b7319/"],
    image: "https://anukalpeu.vercel.app/images/anukalp-photo.jpeg",
    description: "Backend engineer specializing in Java, Spring Boot, multi-tenant SaaS, and AI-integrated applications",
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${bebas.variable} ${playfair.variable} antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          suppressHydrationWarning
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  )
}
