"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import "./VortexModal.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VortexModal({ isOpen, onClose }: Props) {
  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLAnchorElement>(null);

  let frameId: number;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - rect.width / 2;
        const dy = y - rect.height / 2;
        const maxTilt = 30; // plus fort qu'avant pour plus d'effet

        // Inversion de rotateX pour que le haut s'incline vers l'arrière
        const rotateX = -(dy / (rect.height / 2)) * maxTilt;
        const rotateY = (dx / (rect.width / 2)) * maxTilt;

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(frameId);
      inner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    inner.addEventListener("mousemove", handleMouseMove);
    inner.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      inner.removeEventListener("mousemove", handleMouseMove);
      inner.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Bouton de fermeture */}
      <button
        className="absolute top-6 right-6 text-white hover:text-primary transition"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Le vortex global */}
      <div className="vortex-modal-wrapper">
        <div className="vortex-ring" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />

        {/* Le contenu (titre + vignette) */}
        <div className="vortex-content">
          <h2 className="vortex-title">
            Looking for a different <em>site</em>?<br />
            Go back in <b>time…</b>
          </h2>

          <div className="vortex-thumb-wrapper" ref={wrapperRef}>
            <a
              className="vortex-thumb-inner"
              href="https://v1.karimfeki.com"
              target="_blank"
              rel="noreferrer"
              ref={innerRef}
            >
              <img src="/v1.png" alt="v1" />
              <span>v1</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
