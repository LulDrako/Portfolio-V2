"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const imageCount = 16;

export default function DeloreanSpinner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageCount);
    }, 200); // ~3.2s par tour = plus smooth que 100ms
    return () => clearInterval(interval);
  }, []);

  const src = `/delorean/delorean-${String(index + 1).padStart(2, "0")}.webp`;

  return (
    <motion.img
      src={src}
      alt="DeLorean rotating"
      className="w-20 md:w-24 lg:w-28 select-none"
      initial={{ y: 0 }}
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      draggable={false}
    />
  );
}
