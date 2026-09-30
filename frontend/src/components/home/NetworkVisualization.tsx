import { motion } from "framer-motion";

interface NodeProps {
  x: string;
  y: string;
  label: string;
  delay: number;
}

function NetworkNode({
  x,
  y,
  label,
  delay,
}: NodeProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
      }}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Pulse */}
      <motion.div
        className="absolute -inset-5 rounded-full border border-cyan-300/10"
        animate={{
          scale: [0.8, 1.5, 0.8],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 3,
          delay,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Node */}
      <motion.div
        whileHover={{
          scale: 1.25,
        }}
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-cyan-300/50 bg-[#071219] shadow-[0_0_25px_rgba(34,211,238,0.12)]"
      >
        <motion.span
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            delay,
            repeat: Infinity,
          }}
          className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,1)]"
        />
      </motion.div>

      {/* Label */}
      <span className="absolute left-10 top-1 whitespace-nowrap text-[8px] uppercase tracking-[0.25em] text-white/25">
        {label}
      </span>
    </motion.div>
  );
}

function DataPulse({
  path,
  duration,
  delay,
}: {
  path: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.circle
      r="3"
      fill="#67e8f9"
      filter="url(#glow)"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
    </motion.circle>
  );
}

export default function NetworkVisualization() {
  const routeA =
    "M 100 170 C 180 80, 300 110, 390 180 S 520 280, 600 180";

  const routeB =
    "M 120 430 C 230 350, 300 380, 390 270 S 510 220, 610 400";

  const routeC =
    "M 170 180 C 240 260, 330 290, 450 400";

  return (
    <div className="relative aspect-square w-full">
      {/* Outer atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-[5%] rounded-full bg-cyan-300/[0.025] blur-[90px]"
      />

      {/* Rings */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[7%] rounded-full border border-dashed border-cyan-300/10"
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[18%] rounded-full border border-white/[0.06]"
      />

      <div className="absolute inset-[30%] rounded-full border border-cyan-300/[0.08]" />

      {/* SVG network */}
      <svg
        viewBox="0 0 700 560"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id="glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main routes */}
        <motion.path
          d={routeA}
          fill="none"
          stroke="rgba(103,232,249,0.22)"
          strokeWidth="1"
          strokeDasharray="7 11"
          animate={{
            strokeDashoffset: [0, -180],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.path
          d={routeB}
          fill="none"
          stroke="rgba(103,232,249,0.16)"
          strokeWidth="1"
          strokeDasharray="5 12"
          animate={{
            strokeDashoffset: [0, -200],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.path
          d={routeC}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="3 12"
          animate={{
            strokeDashoffset: [0, -120],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Moving data */}
        <DataPulse
          path={routeA}
          duration={5}
          delay={0}
        />

        <DataPulse
          path={routeA}
          duration={5}
          delay={2.5}
        />

        <DataPulse
          path={routeB}
          duration={7}
          delay={1}
        />

        <DataPulse
          path={routeC}
          duration={4}
          delay={0.5}
        />
      </svg>

      {/* Nodes */}
      <NetworkNode
        x="13%"
        y="29%"
        label="Guwahati"
        delay={0.7}
      />

      <NetworkNode
        x="42%"
        y="17%"
        label="Shillong"
        delay={0.9}
      />

      <NetworkNode
        x="78%"
        y="30%"
        label="Itanagar"
        delay={1.1}
      />

      <NetworkNode
        x="61%"
        y="51%"
        label="Imphal"
        delay={1.3}
      />

      <NetworkNode
        x="78%"
        y="72%"
        label="Aizawl"
        delay={1.5}
      />

      <NetworkNode
        x="35%"
        y="76%"
        label="Agartala"
        delay={1.7}
      />

      {/* Center intelligence core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-16 rounded-full bg-cyan-300/10 blur-3xl"
        />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -inset-10 rounded-full border border-dashed border-cyan-300/20"
        />

        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/30 bg-[#061017]/90 shadow-[0_0_100px_rgba(34,211,238,0.12)] backdrop-blur-xl">
          <motion.div
            animate={{
              scale: [0.7, 1, 0.7],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
            }}
            className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_35px_rgba(103,232,249,1)]"
          />
        </div>

        <div className="absolute left-1/2 top-[calc(100%+22px)] -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.35em] text-cyan-300/50">
          ANVAYA AI CORE
        </div>
      </div>

      {/* Floating telemetry cards */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-[55%] rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 backdrop-blur-xl"
      >
        <div className="text-[8px] uppercase tracking-[0.25em] text-white/25">
          Network status
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

          <span className="text-xs text-white/60">
            Connected
          </span>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [6, -6, 6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[5%] right-0 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.025] px-4 py-3 backdrop-blur-xl"
      >
        <div className="text-[8px] uppercase tracking-[0.25em] text-cyan-300/35">
          Intelligence
        </div>

        <div className="mt-2 text-sm font-medium text-cyan-200/70">
          Active
        </div>
      </motion.div>
    </div>
  );
}