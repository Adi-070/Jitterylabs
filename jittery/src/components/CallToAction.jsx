'use client';
import React, { useEffect, useRef } from 'react'
import styles from '../styles/pages.module.css';
import { useScroll, motion } from 'framer-motion';

const paragraph = "100,000,000,000 professional photos are taken every year, approximately. But these are the photos that are going to stay with you."

export default function CallToAction() {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element, 
    offset: ['start 0.9', 'start 0.25'] 
  })

  useEffect (() => {
    scrollYProgress.on("change", e => console.log(e)) 
  },[])

  return (
    <main>
      <div style={{height: '100vh'}}></div>
      <motion.p 
        className={styles.paragraph}
        ref={element}
        style={{opacity: scrollYProgress}}
      >
        {paragraph}
      </motion.p>
      <div style={{height: '100vh'}}></div>
    </main>
  )
}