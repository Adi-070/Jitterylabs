"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CallToAction() {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [maxDistance, setMaxDistance] = useState(0)

  useEffect(() => {
   
    setMaxDistance(window.innerHeight / 4)

    const handleMouseMove = (event) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    const handleResize = () => {
      setMaxDistance(window.innerHeight / 4)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const sentences = [
    ["100,000,000,000", "professional photos are", "taken every year,", "approximately."],
    ["But these are the photos", "that are going to", "stay with you."],
  ]

  const getOpacity = (lineRect) => {
    if (maxDistance === 0) return 0.3 // Default opacity when maxDistance isn't set yet
    const distance = Math.abs(mousePosition.y - (lineRect.top + lineRect.height / 2))
    return Math.max(0, 1 - distance / maxDistance)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_VERCEL_URL}/DOxkX.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 to-black/50" />
      <ScrollArea className="relative z-20 h-screen">
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-20">
          {sentences.map((sentence, sentenceIndex) => (
            <div key={sentenceIndex} className="mb-20 last:mb-0">
              {sentence.map((line, lineIndex) => {
                const opacity = getOpacity(
                  containerRef.current?.children[sentenceIndex].children[lineIndex]?.getBoundingClientRect() || { top: 0, height: 0 }
                )
                return (
                  <span
                    key={`${sentenceIndex}-${lineIndex}`}
                    className="block text-4xl font-semibold transition-all duration-300 md:text-6xl lg:text-7xl text-center leading-tight mb-2"
                    style={{
                      color: `rgb(255, 255, 255)`,
                      opacity: 0.3 + (opacity * 0.7),
                    }}
                  >
                    {line}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}