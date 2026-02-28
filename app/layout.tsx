import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Bebas_Neue } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" })

export const metadata: Metadata = {
  title: "Anukalp Gupta - Full-Stack Developer & Web Designer | Portfolio",
  description:
    "Full-stack developer specializing in React, Next.js, and modern web technologies. Building performant, accessible web experiences. Available for freelance projects.",
  keywords: [
    "web developer",
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "JavaScript developer",
    "UI/UX designer",
    "freelance developer",
    "portfolio",
    "web design",
    "web development services",
  ],
  authors: [{ name: "Anukalp Gupta", url: "https://anukalpeu.vercel.app" }],
  creator: "Anukalp Gupta",
  metadataBase: new URL("https://anukalpeu.vercel.app"),
  openGraph: {
    title: "Anukalp Gupta - Full-Stack Developer & Web Designer",
    description:
      "Full-stack developer specializing in React, Next.js, and modern web technologies. Showcasing 6+ projects with 500+ active users.",
    type: "website",
    url: "https://anukalpeu.vercel.app",
    siteName: "Anukalp Gupta Portfolio",
    images: [
      {
        url: "/images/anukalp-photo.jpeg",
        width: 1200,
        height: 630,
        alt: "Anukalp Gupta - Full-Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anukalp Gupta - Full-Stack Developer",
    description: "Building beautiful, performant web experiences. React, Next.js, and modern web technologies.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anukalp Gupta",
    url: "https://anukalpeu.vercel.app",
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed",
    },
    sameAs: ["https://github.com/ask8962", "https://www.linkedin.com/in/anukalp-gupta-23b4b7319/"],
    image: "https://anukalpeu.vercel.app/images/anukalp-photo.jpeg",
    description: "Full-stack developer specializing in React, Next.js, and modern web technologies",
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bebas.variable} antialiased dark`}>
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
      <body className="font-sans">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  )
}
