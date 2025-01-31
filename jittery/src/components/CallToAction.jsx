"use client"

import { useEffect, useRef, useState } from "react"
import BgVideo from "./BgVideo"
import useNumberAnimation from "./NumberCounter";


function NumberCounter() {
  const [count, setCount] = useState(0);
  const targetNumber = 100000000000;
  const duration = 5000;
  const framesPerSecond = 60;
  const totalFrames = (duration / 1000) * framesPerSecond;
  const incrementPerFrame = targetNumber / totalFrames;

  useEffect(() => {
    let frame = 0;
    let lastTimestamp = performance.now();
    
    const animate = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;
      const framesToUpdate = Math.floor((elapsed / (1000 / framesPerSecond)));
      
      if (framesToUpdate > 0) {
        frame += framesToUpdate;
        if (frame <= totalFrames) {
          setCount(Math.min(Math.floor(frame * incrementPerFrame), targetNumber));
          lastTimestamp = timestamp;
          requestAnimationFrame(animate);
        } else {
          setCount(targetNumber);
        }
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      frame = totalFrames + 1;
    };
  }, []);
}

const line1 = [
  "100,000,000,000",
]

const line2 = [
  "professional photos are taken every year, approximately.",
]

const line3 = [
  "But these are the photos that are going to stay with you.",
]

export default function CallToAction() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef1 = useRef(null)
  const containerRef2 = useRef(null)
  const containerRef3 = useRef(null)
  const count = useNumberAnimation()

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
    if (!containerRef1.current) return index === 0 ? 1 : 0.3

    const containerRect1 = containerRef1.current.getBoundingClientRect()
    const centerY = window.innerHeight / 2
    // const lineHeight = containerRect.height / 3
    const containerRect2 = containerRef2.current.getBoundingClientRect()
    const containerRect3 = containerRef3.current.getBoundingClientRect()

    // Calculate the Y position of the line's center
    // const linePositionY = containerRect1.top + (index+0.1) * lineHeight
    // console.log(containerRect1.top);
    // console.log(centerY);
    if (index === 0) {
      // First line: full opacity when at or above center
      // if (scrollY==0) return 1;
      const distance = centerY - containerRect1.top
      return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
    } else if (index === 1) {
      // Second line: gradual opacity change
      const distance = Math.abs(centerY - containerRect2.top)
      return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
    } else {
      // Third line: appear when reaching center
      // const distance = Math.abs(centerY - (containerRect1.top + lineHeight1))
      // return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
      return centerY>=containerRect3.top? 1:0
    }
  }

  return (
    <main className="min-h-[100vh] text-white flex flex-col items-center justify-start pt-[30vh] overflow-hidden">
      <div className="h-[90vh]">
      <div ref={containerRef1} 
        className="flex flex-col items-center justify-start sticky top-0 text-7xl md:text-8xl lg:text-9xl font-bold mb-8 
        text-center px-4 left-0 right-0 transition-all duration-5"
        style={{
              opacity: calculateOpacity(0),
        }}>
        {count}
      </div>
      <div ref={containerRef2}
      className="flex flex-col items-center justify-start text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 
      transition-all duration-5 mt-[100px]"
      style = {{
        opacity: calculateOpacity(1),
      }}>
        {line2}
      </div>
      </div>
      <div ref={containerRef3}
      className="h-[50vh] flex flex-col items-center justify-start text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 transition-all duration-500"
      style = {{
        opacity: calculateOpacity(2),
      }}>
        {line3}
        {/* <BgVideo textRef={containerRef1} className="z-0"/> */}
      </div>
    </main>
  )
}

