"use client"

import { useEffect, useRef, useState } from "react"
import BgVideo from "./BgVideo"

const lines = [
  "100,000,000,000",
  "professional photos are taken every year, approximately.",
]

const line3 = [
  "But these are the photos that are going to stay with you.",
]

export default function CallToAction() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef(null)
  const containerRef1 = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const calculateOpacity = (index) => {
    if (!containerRef.current) return index === 0 ? 1 : 0.3

    const containerRect = containerRef.current.getBoundingClientRect()
    const centerY = window.innerHeight / 2
    const lineHeight = containerRect.height / 3
    const containerRect1 = containerRef1.current.getBoundingClientRect()

    // Calculate the Y position of the line's center
    const linePositionY = containerRect.top + (index+0.1) * lineHeight
    console.log(containerRect1.top);
    console.log(centerY);
    if (index === 0) {
      // First line: full opacity when at or above center
      // if (scrollY==0) return 1;
      const distance = centerY - linePositionY
      return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
    } else if (index === 1) {
      // Second line: gradual opacity change
      const distance = Math.abs(centerY - linePositionY)
      return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
    } else {
      // Third line: appear when reaching center
      // const distance = Math.abs(centerY - (containerRect1.top + lineHeight1))
      // return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
      return centerY>=containerRect1.top? 1:0
    }
  }

  return (
    <main className="min-h-[100vh] text-white flex flex-col items-center justify-start pt-[25vh] overflow-hidden">
      <div ref={containerRef} className="h-[90vh] flex flex-col items-center justify-start sticky top-0">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`text-center px-4 left-0 right-0 transition-all duration-5 ${
              index === 0
                ? "text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
                : index === 1
                  ? "text-3xl md:text-4xl lg:text-5xl font-semibold mt-10"
                  : "text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 mt-40"
            }`}
            style={{
              opacity: calculateOpacity(index),
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <div ref={containerRef1}
      className="h-[50vh] flex flex-col items-center justify-start text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 transition-all duration-1000"
      style = {{
        opacity: calculateOpacity(2),
      }}>
        {line3}
        {/* <BgVideo textRef={containerRef1} className="z-0"/> */}
      </div>
    </main>
  )
}

