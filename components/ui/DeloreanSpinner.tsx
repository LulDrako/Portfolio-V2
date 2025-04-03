"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const imageCount = 16;

export default function DeloreanSpinner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageCount);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const src = `/delorean/delorean-${String(index + 1).padStart(2, "0")}.webp`;

  return (
    <motion.div
      className="w-20 md:w-24 lg:w-28 cursor-pointer select-none"
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <img
        src={src}
        alt="DeLorean rotating"
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </motion.div>
  );
}
