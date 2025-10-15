import React from "react";
import { motion } from "framer-motion";

export default function AnimatedImageHalf() {
  return (
    <div className="w-1/2 flex items-center justify-center relative overflow-hidden p-12 bg-gradient-to-br from-orange-50 to-blue-100">

      {/* More visible + larger animated background blobs */}
      <motion.div
        className="absolute top-5 left-5 w-48 h-48 bg-white/40 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          borderRadius: ["50%", "35%", "50%"],
          rotate: [0, 20, 0],
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-16 right-8 w-40 h-40 bg-orange-300/40 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.25, 1],
          borderRadius: ["50%", "40%", "50%"],
          rotate: [0, -15, 0],
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* <motion.div
        className="absolute top-1/3 right-16 w-32 h-32 bg-blue-300/35 rounded-full blur-xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 20, -10, 0],
          y: [0, -15, 15, 0],
          rotate: [0, 25, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 0.4,
        }}
      /> */}

      <motion.div
        className="absolute bottom-8 left-1/3 w-36 h-36 bg-white/30 rounded-full blur-2xl"
        animate={{
          scale: [1, 0.85, 1.1, 1],
          borderRadius: ["50%", "60%", "42%", "50%"],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Logo/Image with breathing effect */}
      <div className="relative w-80 h-80 flex items-center justify-center z-10">
        <motion.div
          className="absolute w-60 h-60 bg-blue-200/30 rounded-full shadow-2xl flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Harmony Logo"
            className="w-full h-full object-contain p-14"
          />
        </motion.div>
      </div>
    </div>
  );
}
