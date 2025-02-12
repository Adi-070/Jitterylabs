"use client"

import { useRef, useEffect, useState } from "react"

const BgVideo = ({ text }) => {
  const videoRef = useRef(null)
  const [isInViewport, setIsInViewport] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0 }
    )

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
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

      {/* Overlay Text */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-white text-4xl font-bold p-8 transition-all duration-300 ${
          isInViewport ? "bg-transparent" : "bg-black bg-opacity-50"
        } z-10`}
      >
        {text}
      </div>
    </div>
  )
}

export default BgVideo
