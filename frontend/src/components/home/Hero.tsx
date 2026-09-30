import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NetworkVisualization from "./NetworkVisualization";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-[140px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1380px] items-center gap-12 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[1fr_1fr] lg:px-16 lg:pt-32">
        {/* LEFT */}
        <div className="relative z-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="mb-8 flex items-center gap-4"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 52 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              className="h-px bg-cyan-300"
            />

            <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-300/70">
              North Eastern Region
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(3.5rem,6.8vw,7rem)] font-semibold leading-[0.8] tracking-[-0.075em]"
            >
              Intelligent
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hero-outline mt-2 text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.075em]"
            >
              Mobility
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="mt-10 max-w-xl text-base leading-7 text-white/45 md:text-lg"
          >
            AI-powered logistics and accessibility intelligence
            designed to connect the North Eastern Region through
            smarter routes, predictive intelligence and better
            transportation decisions.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                document
                  .getElementById("network")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="primary-action"
            >
              Explore Network
              <span>↗</span>
            </motion.button>

            <motion.button
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => navigate("/login")}
              className="secondary-action"
            >
              Enter Platform
              <span>→</span>
            </motion.button>
          </motion.div>

          {/* System status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="mt-12 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/25"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/50" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-300" />
            </span>

            ANVAYA intelligence network
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.88,
            x: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1.4,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-[600px]"
        >
          <NetworkVisualization />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.8,
        }}
        className="absolute bottom-8 left-6 z-20 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/25 md:left-10 lg:left-16"
      >
        <motion.span
          animate={{
            height: [20, 40, 20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-px bg-cyan-300"
        />

        Explore ANVAYA
      </motion.div>
    </section>
  );
}