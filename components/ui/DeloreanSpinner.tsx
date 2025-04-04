  "use client";

  import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import Image from "next/image";

  const totalFrames = 16;

  export default function DeloreanSpinner() {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setFrame((prev) => (prev + 1) % totalFrames);
      }, 150);
      return () => clearInterval(interval);
    }, []);

    const frameSrc = `/delorean/delorean-${String(frame + 1).padStart(2, "0")}.webp`;

    return (
      <motion.div
        className="w-20 md:w-24 lg:w-28 pointer-events-auto z-50"
        whileHover={{ y: -10, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
    src={frameSrc}
    alt="DeLorean rotating"
    width={128}
    height={128}
    className="w-full h-full object-contain"
    draggable={false}
    priority // <-- essentiel
    quality={100} // <-- très important
  />

      </motion.div>
    );
  }
