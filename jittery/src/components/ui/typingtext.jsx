import { useEffect, useState } from "react";

export default function TypingText({ text = "", speed = 30, style ={} }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#fff", padding: "0.5rem 0", ...style }}>
      {displayedText}
      {/* <span className="blinking-cursor">|</span>
      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          width: 1px;
          background-color: #fff;
          animation: blink 1s step-start infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style> */}
    </div>
  );
}
