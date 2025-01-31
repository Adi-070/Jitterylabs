import React, { useState, useEffect } from 'react';

const useNumberAnimation = (start = 0, end = 100000000000, duration = 3000) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const framesPerSecond = 60;
    const totalFrames = (duration / 1000) * framesPerSecond;
    const incrementPerFrame = (end - start) / totalFrames;
    let frame = 0;
    let lastTimestamp = performance.now();
    
    const animate = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;
      const framesToUpdate = Math.floor((elapsed / (1000 / framesPerSecond)));
      
      if (framesToUpdate > 0) {
        frame += framesToUpdate;
        if (frame <= totalFrames) {
          setCount(Math.min(Math.floor(start + frame * incrementPerFrame), end));
          lastTimestamp = timestamp;
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      } else {
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []); // Empty dependency array means this runs once on mount

  return count;
};

export default useNumberAnimation;