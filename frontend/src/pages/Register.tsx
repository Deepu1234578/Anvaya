import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://anvaya-9dac.onrender.com";

export default function Register() {
  const navigate = useNavigate();

  const [showIntro, setShowIntro] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setError("");

  if (!fullName.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      {
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      }
    );

    console.log("Registration successful:", response.data);

    navigate("/login", {
      state: {
        registered: true,
        email: email.trim().toLowerCase(),
      },
    });
  } catch (error: unknown) {
    console.error("REGISTRATION ERROR:", error);

    if (axios.isAxiosError(error)) {
      const detail = error.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(
          detail
            .map((item) => item.msg)
            .filter(Boolean)
            .join(", ")
        );
      } else {
        setError(
          `Registration failed (${error.response?.status ?? "network error"}).`
        );
      }
    } else {
      setError("Unable to connect to the ANVAYA server.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020509] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="anvaya-grid absolute inset-0 opacity-40" />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[150px]"
        />

        <motion.div
          animate={{
            x: ["-10vw", "110vw"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
          className="absolute top-1/2 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
        />

      </div>

      {/* =====================================================
          CINEMATIC INTRO
      ===================================================== */}

      <AnimatePresence>
  {showIntro && (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.2,
        delay: 2.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={() => setShowIntro(false)}
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[#020509]"
    >
      {/* Horizon */}
      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: 1,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-1/2 h-px w-[120vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
      />

      {/* Wave 1 */}
      <motion.div
        initial={{
          scale: 0.15,
          y: 250,
          opacity: 0,
        }}
        animate={{
          scale: [0.15, 1, 1.5],
          y: [250, 0, -80],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[420px] w-[1200px] -translate-x-1/2 rounded-[50%] border border-cyan-300/30"
      />

      {/* Wave 2 */}
      <motion.div
        initial={{
          scale: 0.1,
          y: 300,
          opacity: 0,
        }}
        animate={{
          scale: [0.1, 0.8, 1.4],
          y: [300, 20, -100],
          opacity: [0, 0.55, 0],
        }}
        transition={{
          duration: 2.5,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[300px] w-[900px] -translate-x-1/2 rounded-[50%] border border-cyan-200/20"
      />

      {/* Wave 3 */}
      <motion.div
        initial={{
          scale: 0.1,
          y: 350,
          opacity: 0,
        }}
        animate={{
          scale: [0.1, 0.7, 1.2],
          y: [350, 40, -120],
          opacity: [0, 0.35, 0],
        }}
        transition={{
          duration: 2.7,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[220px] w-[700px] -translate-x-1/2 rounded-[50%] border border-cyan-300/15"
      />

      {/* Ocean glow */}
      <motion.div
        initial={{
          scale: 0.4,
          opacity: 0,
        }}
        animate={{
          scale: [0.4, 1.2, 1.5],
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 2.5,
          ease: "easeOut",
        }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]"
      />

      {/* Data particles */}
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          initial={{
            x: `${(index % 6) * 20 - 50}vw`,
            y: "60vh",
            opacity: 0,
          }}
          animate={{
            x: `${(index % 6) * 20 - 50 + (index % 2 === 0 ? 15 : -15)}vw`,
            y: `${20 + (index % 5) * 12}vh`,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.8 + (index % 4) * 0.15,
            delay: index * 0.06,
            ease: "easeOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
        />
      ))}

      {/* Center identity */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">

          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1.3, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-16 w-16 items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-cyan-300/30 border-t-cyan-300"
            />

            <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_35px_rgba(103,232,249,1)]" />
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
              letterSpacing: "0.8em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.35em",
            }}
            transition={{
              duration: 0.9,
              delay: 1,
            }}
            className="mt-7 text-3xl font-semibold"
          >
            ANVAYA
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 1.45,
            }}
            className="mt-3 text-[9px] uppercase tracking-[0.45em] text-cyan-300/50"
          >
            Initializing New Node
          </motion.p>

        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* =====================================================
          REGISTER CONTENT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          delay: 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex min-h-screen items-center justify-center px-5 py-20"
      >

        <div className="w-full max-w-[470px]">

          {/* Header */}
          <div className="mb-9 text-center">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span className="h-px w-8 bg-cyan-300/40" />

              <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-300/60">
                New Access
              </span>

              <span className="h-px w-8 bg-cyan-300/40" />
            </motion.div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em]">
              Create your account.
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Join the ANVAYA intelligence network.
            </p>
          </div>

          {/* Card */}
          <motion.div
            whileHover={{
              borderColor: "rgba(103,232,249,0.18)",
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-7 shadow-2xl backdrop-blur-2xl md:p-9"
          >

            <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-300/[0.035] blur-[90px]" />

            <form
              onSubmit={handleSubmit}
              className="relative space-y-4"
            >

              {/* Full name */}
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Full name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  placeholder="Your name"
                  required
                  minLength={2}
                  maxLength={150}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  maxLength={72}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025]"
                />
              </div>

              {/* Confirm */}
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Confirm password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Repeat your password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025]"
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-xs text-red-300"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group relative mt-2 w-full overflow-hidden rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-semibold text-[#020509] transition-all hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10">
                  {loading
                    ? "Creating profile..."
                    : "Create ANVAYA account"}
                </span>

                {!loading && (
                  <span className="relative z-10 ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}

                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              </motion.button>

            </form>

            {/* Login */}
            <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
              <span className="text-xs text-white/30">
                Already have an account?
              </span>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ml-2 text-xs text-cyan-300/70 transition hover:text-cyan-300"
              >
                Sign in →
              </button>
            </div>

          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/15">
              ANVAYA • North Eastern Region • India
            </p>
          </div>

        </div>
      </motion.div>
    </main>
  );
}