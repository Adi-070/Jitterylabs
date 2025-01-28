"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const messages = [
  "• Hello",
  "• Olá",
  "• Hola",
  "• Bonjour",
  "• Hallo",
  "• Ciao",
  "• こんにちは (Konnichiwa)",
  "• 안녕하세요 (Annyeonghaseyo)",
  "• 你好 (Nǐ hǎo)",
  "• Привет (Privet)",
]

export default function Loader() {
  const [visibleMessageIndex, setVisibleMessageIndex] = useState(0)
  const [isLoaderVisible, setIsLoaderVisible] = useState(true)

  const totalDuration = 2000
  const messageDuration = totalDuration / messages.length

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleMessageIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, messageDuration)

    // Hide loader after the total duration
    const timeout = setTimeout(() => {
      setIsLoaderVisible(false)
    }, totalDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [messageDuration])

  return (
    <AnimatePresence>
      {isLoaderVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black text-white text-7xl z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Fades out over 1 second
        >
          <motion.div
            key={visibleMessageIndex}
            className="absolute"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {messages[visibleMessageIndex]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
