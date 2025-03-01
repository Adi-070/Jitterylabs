import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrolledControlledVideo = () => {
  const nextVideoRef = useRef(null);
  const nextDivRef = useRef(null);
  const videoLoadedRef = useRef(false);
  const scrollTriggerRef = useRef(null);
  const [isNextDivVisible, setIsNextDivVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = nextVideoRef.current;
    const container = nextDivRef.current;
    
    if (!video || !container) return;
    
    // Preload the video
    video.preload = "auto";

    if (video) {
        video.style.transform = 'translateZ(0)'; // Force GPU acceleration
        video.style.willChange = 'contents'; // Hint to the browser
        video.muted = true; // Ensure video is muted for autoplay
      
      // Set playbackRate slightly slower for smoother appearance during scrolling
      video.defaultPlaybackRate = 0.95;
      video.playbackRate = 0.95;
      }
    
    // Track when video is loaded
    const handleVideoLoaded = () => {
      videoLoadedRef.current = true;
      console.log('Video loaded and ready');
      
      // Initialize ScrollTrigger after video is loaded
      initScrollTrigger();
    };
    
    // Apply performance optimizations
    
    
    // Set up Intersection Observer to detect when the container is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsNextDivVisible(entry.isIntersecting);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "20% 0px",
      }
    );
    
    observer.observe(container);
    
    // Initialize GSAP ScrollTrigger
    const initScrollTrigger = () => {
      // Kill any existing ScrollTrigger instances
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      // Create new ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom', // start when top of container hits bottom of viewport
        end: 'bottom top',   // end when bottom of container hits top of viewport
        scrub: true,          // smooth scrubbing with 0.5s lag
        markers: false,      // helpful for debugging
        onUpdate: (self) => {
          // Update scroll progress state
          setScrollProgress(self.progress);
          
          // Update video time based on scroll progress
          if (video && videoLoadedRef.current && video.duration) {
            const targetTime = video.duration * self.progress;
            video.currentTime = targetTime;
          }
        },
        onEnter: () => setIsNextDivVisible(true),
        onLeave: () => setIsNextDivVisible(false),
        onEnterBack: () => setIsNextDivVisible(true),
        onLeaveBack: () => setIsNextDivVisible(false),
      });
      
      console.log('ScrollTrigger initialized');
    };
    
    // Add event listener for video loaded
    video.addEventListener("loadeddata", handleVideoLoaded);
    
    // If video is already loaded, initialize ScrollTrigger right away
    if (video.readyState >= 3) {
      videoLoadedRef.current = true;
      initScrollTrigger();
    }
    
    // Clean up
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", handleVideoLoaded);
      
      // Kill ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);
  
  return (
    <div 
      ref={nextDivRef}
      className="video-container"
      style={{
        height: '200vh',
        position: 'relative',
      }}
    >
      <div className="video-wrapper" style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <video
          ref={nextVideoRef}
          src="scroll-video.mp4" // Replace with your video source
          muted
          playsInline
          className={`fixed top-0 left-0 w-full h-full transition-opacity aspect-[21/9] duration-500 z-0 ${isNextDivVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
        
        {/* Optional progress indicator */}
        {/* <div className="progress-indicator" style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '5px 10px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          borderRadius: '4px',
        }}>
          {Math.round(scrollProgress * 100)}%
        </div> */}
      </div>
    </div>
  );
};

export default ScrolledControlledVideo;