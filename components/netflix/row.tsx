"use client"

import { useRef } from "react"
import Card from "./card"

type Item = {
  title: string
  img: string
  alt?: string
  href?: string
}

export default function Row({ title, items, id }: { title: string; items: Item[]; id?: string }) {
  const scroller = useRef<HTMLDivElement>(null)

  function scrollBy(amount: number) {
    scroller.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section id={id} className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="display-title text-2xl mb-3">{title}</h2>
          <div className="hidden md:flex gap-2">
            <button
              aria-label="Scroll left"
              onClick={() => scrollBy(-600)}
              className="rounded bg-secondary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition"
            >
              ◀
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollBy(600)}
              className="rounded bg-secondary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition"
            >
              ▶
            </button>
          </div>
        </div>

        <div ref={scroller} className="no-scrollbar flex gap-4 overflow-x-auto scroll-px-4 snap-x snap-mandatory pb-2">
          {items.map((it) => (
            <div key={it.title} className="snap-start">
              <Card title={it.title} img={it.img} alt={it.alt} href={it.href} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
