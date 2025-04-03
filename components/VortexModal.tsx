"use client";

import { X } from "lucide-react";
import Tilt from "react-parallax-tilt";
import "./VortexModal.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VortexModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        className="absolute top-6 right-6 text-white hover:text-primary transition"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="vortex-modal-wrapper">
        <div className="vortex-ring" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />

        <div className="vortex-content">
          <h2 className="vortex-title">
            Looking for a different <em>site</em>?<br />
            Go back in <b>time…</b>
          </h2>

          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={500}
            scale={1.02}
            transitionSpeed={1000}
            glareEnable={true}
            glareMaxOpacity={0.3}
            className="vortex-thumb-wrapper"
          >
            <a
              href="https://luldrako.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="vortex-thumb-inner"
            >
              <img src="/v1.png" alt="v1" />
              <span>v1</span>
            </a>
          </Tilt>
        </div>
      </div>
    </div>
  );
}
