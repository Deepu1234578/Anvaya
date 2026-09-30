import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Hero from "../components/home/Hero";

const features = [
  {
    number: "01",
    title: "Smart Routing",
    text: "Intelligent routes that consider distance, travel time, road conditions, vehicle constraints and logistics requirements.",
  },
  {
    number: "02",
    title: "Risk Intelligence",
    text: "Predictive visibility into floods, landslides, weather disruptions and transportation risks.",
  },
  {
    number: "03",
    title: "Accessibility",
    text: "Understand connectivity and infrastructure gaps across cities, districts and logistics corridors.",
  },
  {
    number: "04",
    title: "AI Prediction",
    text: "Convert transportation data into predictions and actionable logistics intelligence.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      setMousePosition({
        x,
        y,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03070b] text-white">

      {/* =========================================================
          MOUSE AMBIENT EFFECT
          No cursor / no dot.
          Only subtle color movement in the background.
      ========================================================= */}

      <div
        className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-700 ease-out"
        style={{
          background: `
            radial-gradient(
              420px circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(34, 211, 238, 0.055),
              transparent 70%
            )
          `,
        }}
      />

      {/* Global grid */}
      <div className="anvaya-grid pointer-events-none fixed inset-0 z-0" />

      {/* =========================================================
          HEADER
      ========================================================= */}

      <motion.header
        animate={{
          backgroundColor: scrolled
            ? "rgba(3,7,11,0.78)"
            : "rgba(3,7,11,0)",
          backdropFilter: scrolled
            ? "blur(18px)"
            : "blur(0px)",
        }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.04]"
      >
        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between px-5 py-5 sm:px-6 md:px-10 lg:px-12">

          {/* Logo */}
          <motion.a
            href="#top"
            whileHover={{ scale: 1.03 }}
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-cyan-300/30 transition-all duration-500 group-hover:scale-125 group-hover:border-cyan-300/60" />

              <motion.span
                animate={{
                  scale: [0.7, 1, 0.7],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]"
              />
            </span>

            <span className="text-sm font-semibold tracking-[0.35em]">
              ANVAYA
            </span>
          </motion.a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#network" className="nav-link">
              Network
            </a>

            <a href="#intelligence" className="nav-link">
              Intelligence
            </a>

            <a href="#impact" className="nav-link">
              Impact
            </a>
          </nav>

          {/* Login */}
          <motion.a
            href="/login"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-white/70 backdrop-blur-xl transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/[0.05] hover:text-white"
          >
            Login

            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </motion.a>
        </div>
      </motion.header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <div
        id="top"
        className="relative z-10 w-full"
      >
        <Hero />
      </div>

      {/* =========================================================
          NETWORK
      ========================================================= */}

      <section
        id="network"
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="mx-auto w-full max-w-[1380px] px-5 py-28 sm:px-6 md:px-10 md:py-36 lg:px-12">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
              }}
            >
              <p className="section-eyebrow">
                01 / The Region
              </p>

              <h2 className="section-title">
                Connecting
                <br />
                a complex
                <br />
                region.
              </h2>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
              }}
            >
              <p className="max-w-3xl text-xl leading-9 text-white/40 md:text-2xl">
                Eight states. Thousands of roads. Diverse
                terrain. Millions of journeys.
              </p>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/25">
                ANVAYA brings the region&apos;s transportation
                network into one intelligent spatial system,
                creating a foundation for smarter logistics and
                better accessibility decisions.
              </p>

              <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
                {[
                  ["08", "States"],
                  ["12K+", "Routes"],
                  ["24/7", "Intelligence"],
                  ["∞", "Possibilities"],
                ].map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="bg-[#050a0f] p-6"
                  >
                    <div className="text-2xl font-semibold">
                      {value}
                    </div>

                    <div className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          INTELLIGENCE
      ========================================================= */}

      <section
        id="intelligence"
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="mx-auto w-full max-w-[1380px] px-5 py-28 sm:px-6 md:px-10 md:py-36 lg:px-12">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
            className="mb-20"
          >
            <p className="section-eyebrow">
              02 / Intelligence
            </p>

            <h2 className="section-title mt-6 max-w-5xl">
              Turn movement
              <br />
              into intelligence.
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature.number}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="feature-card group min-h-[320px] bg-[#050a0f] p-8 md:p-12"
              >
                <div className="flex justify-between">
                  <span className="text-xs tracking-[0.3em] text-cyan-300/60">
                    {feature.number}
                  </span>

                  <span className="text-xl text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300">
                    ↗
                  </span>
                </div>

                <div className="mt-24">
                  <h3 className="text-2xl font-medium">
                    {feature.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/30">
                    {feature.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPACT
      ========================================================= */}

      <section
        id="impact"
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="mx-auto w-full max-w-[1380px] px-5 py-28 sm:px-6 md:px-10 md:py-36 lg:px-12">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-cyan-300/[0.025] p-8 md:p-16 lg:p-24"
          >

            <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-cyan-300/[0.06] blur-[120px]" />

            <div className="relative max-w-5xl">
              <p className="section-eyebrow">
                03 / Impact
              </p>

              <h2 className="mt-7 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                Better routes.
                <br />
                Better access.
                <br />
                Better decisions.
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-7 text-white/35 md:text-lg">
                ANVAYA creates an intelligence layer for
                transportation and logistics across the North
                Eastern Region.
              </p>

              <motion.a
                href="/login"
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="primary-action mt-10"
              >
                Enter ANVAYA
                <span>↗</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-5 px-5 py-10 text-[10px] uppercase tracking-[0.2em] text-white/20 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <span>ANVAYA</span>

          <span>
            AI-Powered Smart Logistics & Accessibility
            Intelligence
          </span>

          <span>North Eastern Region • India</span>
        </div>
      </footer>
    </main>
  );
}