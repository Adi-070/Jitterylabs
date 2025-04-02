"use client"

import { useEffect, useRef, useState } from "react"
import useNumberAnimation from "./NumberCounter"
import ScrollControlledVideo from "./ScrolledControlledVideo"

const line1 = ["100,000,000,000"]
const line2 = ["professional photos are taken every year, approximately."]
const line3 = ["But these are the photos that are going to stay with you."]

export default function CallToAction() {
  const [scrollY, setScrollY] = useState(0)
  const [isLine3Visible, setIsLine3Visible] = useState(false)
  const [isLine3Exited, setIsLine3Exited] = useState(false)
  const containerRef1 = useRef(null)
  const containerRef2 = useRef(null)
  const containerRef3 = useRef(null)
  const nextDivRef = useRef(null)
  const count = useNumberAnimation()
  const videoRef = useRef(null)
  const [isNextDivVisible, setIsNextDivVisible] = useState(false)
  const [isNextDivExited, setIsNextDivExited] = useState(false)
  const nextVideoRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [fontSize, setFontSize] = useState("14vw");

  useEffect(() => {
    const updateFontSize = () => {
      setFontSize(`${window.innerWidth / 9.5}px`);
    };
    window.addEventListener("resize", updateFontSize);
    updateFontSize();
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!containerRef3.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLine3Visible(entry.isIntersecting)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setIsLine3Exited(true)
        }
      },
      { threshold: [0, 1] },
    )

    observer.observe(containerRef3.current)
    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    if (!nextDivRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNextDivVisible(entry.isIntersecting)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setIsNextDivExited(true)
        }
      },
      { threshold: [0, 1] },
    )

    observer.observe(nextDivRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isLine3Visible && isNextDivExited) {
        videoRef.current.play().catch(error => console.error("Video play error:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isLine3Visible, isNextDivExited]);
  
  // useEffect(() => {
  //   if (nextVideoRef.current) {
  //     if (isNextDivVisible) {
  //       nextVideoRef.current.play().catch(error => console.error("Next video play error:", error));
  //     } else {
  //       nextVideoRef.current.pause();
  //     }
  //   }
  // }, [isNextDivVisible]);

  // useEffect(() => {
  //   const video = nextVideoRef.current
  //   const container = nextDivRef.current

  //   if (!video || !container) return

  //   video.preload = "metadata"
  //   video.muted = true
  //   video.defaultPlaybackRate = 0.95
  //   video.playbackRate = 0.95
  //   video.style.transform = 'translateZ(0)'
  //   video.style.willChange = 'contents'

  //   // Set up Intersection Observer to detect when the container is in view
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const [entry] = entries
  //       setIsNextDivVisible(entry.isIntersecting)
  //     }// Trigger when at least 10% of the element is visible
  //   )

  //   observer.observe(container)

  //   // Function to update video progress based on scroll position
  //   const handleScroll = () => {
  //     if (!container) return

  //     // Get the container's position relative to the viewport
  //     const rect = container.getBoundingClientRect()

  //     // Calculate how far the container is through the viewport
  //     // Start when the bottom of the container enters the viewport (rect.top <= window.innerHeight)
  //     // End when the top of the container leaves the viewport (rect.bottom <= 0)
  //     const start = window.innerHeight
  //     const end = 0 - rect.height
  //     const current = rect.top

  //     // Calculate progress (0 to 1)
  //     const progress = 1 - (current - end) / (start - end)
  //     const clampedProgress = Math.max(0, Math.min(1, progress))

  //     setScrollProgress(clampedProgress)

  //     // Update video currentTime based on scroll progress
  //     if (video && video.duration) {
  //       video.currentTime = video.duration * clampedProgress
  //     }
  //   }

  //   // Add scroll event listener
  //   window.addEventListener("scroll", handleScroll)

  //   // Initial call to set correct position
  //   handleScroll()
  //   // Clean up
  //   return () => {
  //     observer.disconnect()
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])

  const calculateOpacity = (index) => {
    if (!containerRef1.current) return index === 0 ? 1 : 0.3

    const containerRect1 = containerRef1.current.getBoundingClientRect()
    const centerY = window.innerHeight / 2
    const containerRect2 = containerRef2.current.getBoundingClientRect()
    const containerRect3 = containerRef3.current.getBoundingClientRect()

    if (index === 0) {
      const distance = centerY - containerRect1.top
      return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
    } else if (index === 1) {
      const distance = Math.abs(centerY - containerRect2.top)
      return distance <= 0 ? 1 : Math.max(1 - distance / (window.innerHeight / 2), 0.3)
    } else {
      return centerY >= containerRect3.top ? 1 : 0
    }
  }

  return (
    <main className="min-h-[100vh] text-white flex flex-col items-center justify-center pt-[30vh] overflow-hidden">
      {/* Full-screen video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className={`fixed top-0 left-0 w-full h-full transition-opacity duration-500 z-0 ${isLine3Visible ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="h-[135vh] relative z-0 ">
        <div
          ref={containerRef1}
          className="flex flex-col items-center justify-center sticky top-0 font-bold mb-8
        text-center px-4 left-0 right-0 transition-all duration-500"
          style={{
            opacity: calculateOpacity(0),
            fontSize
          }}
        >
          {count}
        </div>
        <div
          ref={containerRef2}
          className="flex flex-col items-center justify-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-8
      transition-all duration-500 mt-[100px] text-center"
          style={{
            opacity: calculateOpacity(1),
          }}
        >
          {line2}
        </div>
      </div>

      {/* Second Video */}
      {/* <video
        ref={nextVideoRef}
        loop
        muted
        playsInline
        className={`fixed top-0 left-0 w-full h-full transition-opacity duration-500 z-0 ${isNextDivVisible ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/scroll-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div ref={nextDivRef} className={`z-10 h-[600vh] bg-black w-full mb-[90vh] ${isNextDivVisible?"opacity-100":"opacity-0"}`}><ScrollControlledVideo/></div>

      {/* Line 3 */}
      <div ref={containerRef3} 
      className="relative w-full flex flex-col items-center justify-center z-10 transition-all duration-100 mb-[80vh]"
      style={{
        opacity: calculateOpacity(2),
      }}>
        <div
          className=" flex flex-col items-center justify-start text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 transition-all duration-100"
          style={{
            opacity: calculateOpacity(2),
          }}
        >
          {line3}
        </div>
      </div>
      
    </main>
  )
}

