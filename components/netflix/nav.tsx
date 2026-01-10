"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certs", label: "Certifications" },
  { href: "#contact", label: "Contact" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-border">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus-visible:focus-ring">
          <span className="display-title text-2xl text-primary tracking-wide">ANUKALP</span>
          <span className="sr-only">Go to homepage</span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden px-3 py-1 rounded-md bg-secondary text-foreground/80 focus-visible:focus-ring"
          aria-expanded={open}
          aria-controls="primary-menu"
        >
          Menu
        </button>

        <ul
          id="primary-menu"
          className={cn(
            "md:flex md:items-center md:gap-6 text-sm",
            open ? "block mt-3 pb-4 space-y-3" : "hidden md:block",
          )}
        >
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : false
            return (
              <li key={l.href}>
                <a href={l.href} className={cn("hover:text-primary transition-colors", active && "text-primary")}>
                  {l.label}
                </a>
              </li>
            )
          })}
          <li className="hidden md:block">
            <a
              href="#contact"
              className="rounded bg-primary px-3 py-1.5 text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Hire me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
