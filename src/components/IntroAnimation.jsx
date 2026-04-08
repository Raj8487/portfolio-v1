import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function IntroAnimation({ onFinish }) {
  const greetings = ["Hello", "नमस्ते", "Hola"];

  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);

  useEffect(() => {
    let greetingTimer;

    if (index < greetings.length - 1) {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
      );

      greetingTimer = setTimeout(() => setIndex(i => i + 1), 500);
    } else {
      greetingTimer = setTimeout(() => {
        gsap.to(overlayRef.current, {
          y: "-100vh",
          duration: 1,
          onComplete: () => onFinish && onFinish()
        });
      }, 500);
    }

    return () => clearTimeout(greetingTimer);
  }, [index, onFinish]);

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black flex items-center justify-center text-white">
      <h1 ref={greetingRef} className="text-5xl">
        {greetings[index]}
      </h1>
    </div>
  );
}