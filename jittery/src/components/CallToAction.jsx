"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function CallToAction() {
  const sentenceRefs = useRef([]) 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) {
            const opacity = Math.min(1, entry.intersectionRatio * 2)
            entry.target.style.opacity = opacity.toString()
          }
        })
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      }
    )

    sentenceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const sentences = [
    "100,000,000,000 professional photos are taken every year, approximately.",
    "But these are the photos that are going to stay with you."
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video/image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_VERCEL_URL}/DOxkX.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 to-black/50" />

      {/* Scrollable text content */}
      <ScrollArea className="relative z-20 h-screen">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-4xl space-y-[50vh]">
            {sentences.map((sentence, index) => (
              <p
                key={index}
                ref={(el) => {
                  // Dynamically add refs to the array
                  sentenceRefs.current[index] = el
                }}
                className="text-4xl font-semibold text-white transition-opacity duration-300 md:text-6xl lg:text-7xl"
                style={{ opacity: index === 1 ? 1 : 0.3 }}
              >
                {sentence}
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
