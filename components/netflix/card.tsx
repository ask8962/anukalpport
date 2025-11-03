"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  img: string
  alt?: string
  href?: string
  className?: string
}

export default function Card({ title, img, alt, href, className }: Props) {
  const content = (
    <div
      className={cn(
        "group relative aspect-[16/9] w-[300px] shrink-0 overflow-hidden rounded-lg bg-card ring-1 ring-border hover:ring-primary transition",
        className,
      )}
      aria-label={title}
    >
      <Image
        src={img || "/placeholder.svg"}
        alt={alt || title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 300px"
        priority={false}
      />
      <div className="absolute inset-0 overlay-gradient opacity-80"></div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="display-title text-lg leading-none">{title}</h3>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="focus-visible:focus-ring rounded-lg">
        {content}
      </a>
    )
  }
  return content
}
