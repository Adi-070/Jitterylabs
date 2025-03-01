"use client"

import { useEffect, useRef, useState } from "react"
import useNumberAnimation from "./NumberCounter"

import ScrolledControlledVideo from "./ScrolledControlledVideo.mjs";

// Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger);

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
  // Add a ref to track the target video time
  const targetTimeRef = useRef(0)
  // Add a ref to track if the video is loaded
  const videoLoadedRef = useRef(false)
  const scrollTriggerRef = useRef(null);

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

  //   // Preload the video
  //   video.preload = "auto"

  //   // Track when video is loaded
  //   const handleVideoLoaded = () => {
  //     videoLoadedRef.current = true
  //   }

  //   video.addEventListener("loadeddata", handleVideoLoaded)

  //   if (video) {
  //     video.style.transform = 'translateZ(0)'; // Force GPU acceleration
  //     video.style.willChange = 'contents'; // Hint to the browser
  //   }
    

  //   // Set up Intersection Observer to detect when the container is in view
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const [entry] = entries
  //       setIsNextDivVisible(entry.isIntersecting)
  //     },
  //     {
  //       threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  //       rootMargin: "20% 0px",
  //     },
  //   )

  //   observer.observe(container)

  //   let animationFrameId= null
  //   const lastProgress = 0
  //   const SMOOTHING_FACTOR = 0.15 // Lower for smoother but slower transitions

  //   // Function to update video progress based on scroll position
  //   const handleScroll = () => {
  //     if (!container) return

  //     if (animationFrameId) {
  //       cancelAnimationFrame(animationFrameId)
  //     }

  //     animationFrameId = requestAnimationFrame(() => {
  //       const rect = container.getBoundingClientRect()

  //       // Calculate progress (0 to 1)
  //       const start = window.innerHeight
  //       const end = 0 - rect.height
  //       const current = rect.top
  //       const progress = 1 - (current - end) / (start - end)
  //       const clampedProgress = Math.max(0, Math.min(1, progress))
  //       // const clampedProgress = Math.min(1, progress)

  //       // Store the target time based on progress
  //       if (video && video.duration) {
  //         targetTimeRef.current = video.duration * clampedProgress
  //       }

  //       setScrollProgress(clampedProgress)
  //     })
  //   }

  //   // Separate animation loop for smoother video updates
  //   const updateVideoTime = () => {
  //     if (video && videoLoadedRef.current) {
  //       // Apply smoothing between current time and target time
  //       const currentTime = video.currentTime
  //       const targetTime = targetTimeRef.current

  //       video.currentTime = currentTime + (targetTime - currentTime) 

  //       // Only update if the difference is significant enough
  //       // if (Math.abs(currentTime - targetTime) > 0) {
  //       //   // Interpolate between current and target time for smoothness
  //       //   video.currentTime = currentTime + (targetTime - currentTime) * SMOOTHING_FACTOR
  //       // }
  //     }

  //     // Continue the animation loop
  //     requestAnimationFrame(updateVideoTime)
  //   }

  //   // Start the animation loop
  //   const animationLoop = requestAnimationFrame(updateVideoTime)

  //   // Add optimized scroll event listener
  //   window.addEventListener("scroll", handleScroll, { passive: true })

  //   // Initial call to set correct position
  //   handleScroll()

  //   // Clean up
  //   return () => {
  //     observer.disconnect()
  //     window.removeEventListener("scroll", handleScroll)
  //     video.removeEventListener("loadeddata", handleVideoLoaded)
  //     if (animationFrameId) cancelAnimationFrame(animationFrameId)
  //     cancelAnimationFrame(animationLoop)
  //   }
  // }, [])

  // useEffect(() => {
  //   const video = nextVideoRef.current;
  //   const container = nextDivRef.current;
    
  //   if (!video || !container) return;
    
  //   // Preload the video
  //   video.preload = "auto";
    
  //   // Track when video is loaded
  //   const handleVideoLoaded = () => {
  //     videoLoadedRef.current = true;
  //     console.log('Video loaded and ready');
      
  //     // Initialize ScrollTrigger after video is loaded
  //     initScrollTrigger();
  //   };
    
  //   // Apply performance optimizations
  //   if (video) {
  //     video.style.transform = 'translateZ(0)'; // Force GPU acceleration
  //     video.style.willChange = 'contents'; // Hint to the browser
  //   }
    
  //   // Set up Intersection Observer to detect when the container is in view
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const [entry] = entries;
  //       setIsNextDivVisible(entry.isIntersecting);
  //     },
  //     {
  //       threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  //       rootMargin: "20% 0px",
  //     }
  //   );
    
  //   observer.observe(container);
    
  //   // Initialize GSAP ScrollTrigger
  //   const initScrollTrigger = () => {
  //     // Kill any existing ScrollTrigger instances
  //     if (scrollTriggerRef.current) {
  //       scrollTriggerRef.current.kill();
  //     }
      
  //     // Create new ScrollTrigger
  //     scrollTriggerRef.current = ScrollTrigger.create({
  //       trigger: container,
  //       start: 'top bottom', // start when top of container hits bottom of viewport
  //       end: 'bottom top',   // end when bottom of container hits top of viewport
  //       scrub: 0.5,          // smooth scrubbing with 0.5s lag
  //       markers: false,      // helpful for debugging
  //       onUpdate: (self) => {
  //         // Update scroll progress state
  //         setScrollProgress(self.progress);
          
  //         // Update video time based on scroll progress
  //         if (video && videoLoadedRef.current && video.duration) {
  //           const targetTime = video.duration * self.progress;
  //           video.currentTime = targetTime;
  //         }
  //       },
  //       onEnter: () => setIsNextDivVisible(true),
  //       onLeave: () => setIsNextDivVisible(false),
  //       onEnterBack: () => setIsNextDivVisible(true),
  //       onLeaveBack: () => setIsNextDivVisible(false),
  //     });
      
  //     console.log('ScrollTrigger initialized');
  //   };
    
  //   // Add event listener for video loaded
  //   video.addEventListener("loadeddata", handleVideoLoaded);
    
  //   // If video is already loaded, initialize ScrollTrigger right away
  //   if (video.readyState >= 3) {
  //     videoLoadedRef.current = true;
  //     initScrollTrigger();
  //   }
    
  //   // Clean up
  //   return () => {
  //     observer.disconnect();
  //     video.removeEventListener("loadeddata", handleVideoLoaded);
      
  //     // Kill ScrollTrigger instance
  //     if (scrollTriggerRef.current) {
  //       scrollTriggerRef.current.kill();
  //     }
  //   };
  // }, []);



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
    <main className="min-h-[100vh] text-white flex flex-col items-center justify-start pt-[30vh] overflow-hidden">
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

      <div className="h-[135vh] relative z-10">
        <div
          ref={containerRef1}
          className="flex flex-col items-center justify-start sticky top-0 text-7xl md:text-8xl lg:text-9xl font-bold mb-8 
        text-center px-4 left-0 right-0 transition-all duration-500"
          style={{
            opacity: calculateOpacity(0),
          }}
        >
          {count}
        </div>
        <div
          ref={containerRef2}
          className="flex flex-col items-center justify-start text-3xl md:text-3xl lg:text-4xl font-semibold mb-8 
      transition-all duration-500 mt-[100px]"
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
        className={`fixed top-0 left-0 w-full h-full transition-opacity aspect-[21/9] duration-500 z-0 ${isNextDivVisible ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/scroll-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div ref={nextDivRef} className="h-[200vh] bg-black w-full mt-[30vh] mb-[90vh] aspect-[21/9]"><ScrolledControlledVideo/></div>

      {/* Line 3 */}
      <div ref={containerRef3} 
      className="relative w-full flex flex-col items-center justify-center z-10 transition-all duration-500 mb-[80vh]"
      style={{
        opacity: calculateOpacity(2),
      }}>
        <div
          className=" flex flex-col items-center justify-start text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 transition-all duration-500"
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

