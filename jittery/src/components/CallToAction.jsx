"use client"

import React, { useEffect, useRef, useState } from "react"

const lines = [
  "100,000,000,000",
  "professional photos are taken every year, approximately.",
  "But these are the photos that are going to stay with you.",
]

export default function CallToAction() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef(null)

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
    if (!containerRef.current || !lines?.length) return 0.3;
  
    const containerRect = containerRef.current.getBoundingClientRect();
    const lineHeight = containerRect.height / 3;
    const centerY = window.innerHeight / 2;
  
    // Calculate the Y position of the line's center
    const linePositionY = containerRect.top + (index+0.5) * lineHeight + lineHeight / 2;
    // console.log(linePositionY)
    // console.log(centerY)
    // console.log(containerRect.top)
    // console.log(lineHeight/3)
  
    // Calculate distance from the screen center
    const distance = Math.abs(centerY - linePositionY);
    // const maxDistance = window.innerHeight / 2;
    // console.log(distance)
    // console.log(lineHeight/2)
  
    // Return 1 when exactly at center, 0.3 otherwise
    return distance < lineHeight / 2 ? 1 : 0.3;
  };
  

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="h-[100vh] flex flex-col items-center justify-start pt-[25vh]"
        style={{ transform: `translateY(${-scrollY}px)`}}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center px-4 left-0 right-0"
            style={{
              opacity: calculateOpacity(index),
              transition: "opacity 0.5s ease-out",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </main>
  )
}

