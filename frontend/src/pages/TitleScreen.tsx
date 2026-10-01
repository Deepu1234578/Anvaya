import { useEffect } from "react";
import { motion } from "framer-motion";

interface TitleScreenProps {
  onComplete: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function TitleScreen({
  onComplete,
}: TitleScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.main
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.015,
        filter: "blur(3px)",
      }}
      transition={{
        duration: 0.75,
        ease,
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#010205]"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 0.16,
          scale: 1,
        }}
        transition={{
          duration: 2.5,
          ease,
        }}
        className="pointer-events-none absolute h-[560px] w-[560px] rounded-full bg-cyan-400/[0.08] blur-[150px]"
      />

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.07,
        }}
        transition={{
          duration: 2.2,
          delay: 0.2,
          ease,
        }}
        className="pointer-events-none absolute h-[720px] w-[720px] rounded-full border border-cyan-300/[0.05]"
      />

      {/* =====================================================
          INITIAL ENERGY
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 0.7],
          scale: [0, 1, 1],
        }}
        transition={{
          duration: 0.7,
          times: [0, 0.7, 1],
          ease,
        }}
        className="pointer-events-none absolute z-30 h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(165,243,252,1),0_0_55px_rgba(34,211,238,0.75)]"
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.1,
        }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.1, 1, 1.7],
        }}
        transition={{
          duration: 1.1,
          delay: 0.15,
          ease,
        }}
        className="pointer-events-none absolute z-20 h-24 w-24 rounded-full border border-cyan-200/25"
      />

      {/* =====================================================
          SHARED LOGO COMPOSITION
      ===================================================== */}

      <div className="relative z-30 flex w-[900px] max-w-[94vw] items-center justify-center">
        {/* =================================================
            EMBLEM
        ================================================= */}

        <motion.div
          initial={{
            x: 0,
            opacity: 0,
            scale: 0.82,
            rotate: -8,
            filter: "blur(10px)",
          }}
          animate={{
            x: "-205px",
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.7,
            delay: 0.35,
            ease,
          }}
          className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center"
        >
          <motion.img
            src="/assets/anvaya-emblem.png"
            alt=""
            draggable={false}
            initial={{
              filter:
                "drop-shadow(0 0 0 rgba(103,232,249,0))",
            }}
            animate={{
              filter:
                "drop-shadow(0 0 25px rgba(103,232,249,0.42))",
            }}
            transition={{
              duration: 1.7,
              delay: 0.5,
              ease,
            }}
            className="h-[180px] w-auto md:h-[230px] lg:h-[255px]"
          />
        </motion.div>

        {/* =================================================
            WORDMARK
        ================================================= */}

        <motion.div
          initial={{
            x: "70vw",
            opacity: 0,
            scale: 0.96,
            filter: "blur(7px)",
          }}
          animate={{
            x: "135px",
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.65,
            delay: 1.25,
            ease,
          }}
          className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center"
        >
          <img
            src="/assets/anvaya-wordmark.png"
            alt="ANVAYA"
            draggable={false}
            className="h-auto w-[250px] md:w-[400px] lg:w-[510px]"
          />
        </motion.div>
      </div>

      {/* =====================================================
          SUBTLE FORMATION GLOW
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: [0, 0.12, 0],
          scale: [0.8, 1.15, 1.3],
        }}
        transition={{
          duration: 1.1,
          delay: 2.7,
          ease,
        }}
        className="pointer-events-none absolute z-20 h-32 w-[600px] max-w-[80vw] rounded-full bg-cyan-200/10 blur-[60px]"
      />

      {/* =====================================================
          FINAL LIGHT SWEEP
      ===================================================== */}

      <motion.div
        initial={{
          x: "-120%",
          opacity: 0,
        }}
        animate={{
          x: "120%",
          opacity: [0, 0.65, 0],
        }}
        transition={{
          duration: 1.15,
          delay: 2.9,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="pointer-events-none absolute left-0 right-0 top-1/2 z-50 h-px bg-gradient-to-r from-transparent via-cyan-100/80 to-transparent shadow-[0_0_20px_rgba(103,232,249,0.65)]"
      />

      {/* =====================================================
          VERY SMALL FINAL SWAY
      ===================================================== */}

      <motion.div
        initial={{
          y: 0,
          rotate: 0,
        }}
        animate={{
          y: [0, -1, 1, 0],
          rotate: [0, 0.08, -0.08, 0],
        }}
        transition={{
          duration: 0.75,
          delay: 3.45,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute z-40 h-[240px] w-[760px] max-w-[90vw]"
      />

      {/* =====================================================
          SOFT EXIT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0, 0.12, 0],
        }}
        transition={{
          duration: 0.9,
          delay: 3.65,
          times: [0, 0.35, 0.8, 1],
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-0 z-[100] bg-[#010205]"
      />

      {/* =====================================================
          VIGNETTE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[90] bg-[radial-gradient(circle_at_center,transparent_22%,rgba(0,0,0,0.68)_100%)]" />
    </motion.main>
  );
}