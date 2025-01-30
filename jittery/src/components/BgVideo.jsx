"use client"

import { useRef, useEffect, useState } from "react"

const BgVideo = ({textRef}) => {
  const videoRef = useRef(null)
  const [isInViewport, setIsInViewport] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      {
        threshold: 0,
      },
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        ref={textRef}
        className={`relative z-10 min-h-screen flex items-center justify-center text-white text-4xl font-bold p-8 transition-all duration-300 ${
          isInViewport ? "bg-transparent" : "bg-black"
        }`}
      >
      </div>
    </div>
  )
}

export default BgVideo

