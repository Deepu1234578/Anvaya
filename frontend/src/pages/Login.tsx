import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";


import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showIntro, setShowIntro] = useState(true);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020509] text-white">

      {/* =====================================================
          BACKGROUND SYSTEM
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Grid */}
        <div className="anvaya-grid absolute inset-0 opacity-40" />

        {/* Main atmospheric glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[150px]"
        />

        {/* Horizontal system line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-0 right-0 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
        />

        {/* Moving intelligence pulse */}
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
          CINEMATIC ENTRY
      ===================================================== */}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              delay: 2.1,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setShowIntro(false)}
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#020509]"
          >
            <div className="relative flex flex-col items-center">

              {/* Core */}
              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex h-20 w-20 items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.7, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full border border-cyan-300/50"
                />

                <motion.div
                  animate={{
                    scale: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_35px_rgba(103,232,249,1)]"
                />
              </motion.div>

              {/* ANVAYA */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 15,
                  letterSpacing: "0.8em",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  letterSpacing: "0.35em",
                }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 text-3xl font-semibold"
              >
                ANVAYA
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                }}
                className="mt-4 text-[9px] uppercase tracking-[0.45em] text-cyan-300/50"
              >
                Intelligence Network
              </motion.p>

              {/* Loading line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{
                  duration: 1.2,
                  delay: 1.1,
                  ease: "easeInOut",
                }}
                className="mt-7 h-px bg-cyan-300/40"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          LOGIN CONTENT
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

        <div className="w-full max-w-[440px]">

          {/* Brand */}
          <div className="mb-10 text-center">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span className="h-px w-8 bg-cyan-300/40" />

              <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-300/60">
                Secure Access
              </span>

              <span className="h-px w-8 bg-cyan-300/40" />
            </motion.div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em]">
              Welcome back.
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Enter the ANVAYA intelligence network.
            </p>
          </div>

          {/* Login Card */}
          <motion.div
            whileHover={{
              borderColor: "rgba(103,232,249,0.18)",
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-7 shadow-2xl backdrop-blur-2xl md:p-9"
          >

            {/* Card glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-300/[0.035] blur-[90px]" />

            <form
              onSubmit={handleSubmit}
              className="relative space-y-5"
            >

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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_30px_rgba(34,211,238,0.05)]"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-[10px] text-cyan-300/50 transition hover:text-cyan-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_30px_rgba(34,211,238,0.05)]"
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

              {/* Sign in */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group relative w-full overflow-hidden rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-semibold text-[#020509] transition-all hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10">
                  {loading
                    ? "Connecting..."
                    : "Enter ANVAYA"}
                </span>

                {!loading && (
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}

                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/[0.08]" />

                <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                  Or
                </span>

                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* Google */}
              
<div className="flex w-full justify-center">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        setError("");
        setLoading(true);

        if (!credentialResponse.credential) {
          throw new Error("Google credential not received.");
        }

        await googleLogin(credentialResponse.credential);

        navigate("/dashboard");
      } catch (error) {
        console.error("Google login error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Google authentication failed."
        );
      } finally {
        setLoading(false);
      }
    }}
    onError={() => {
      setError("Google sign-in failed.");
    }}
    useOneTap={false}
  />
</div>
    </form>

            {/* Create account */}
            <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
              <span className="text-xs text-white/30">
                New to ANVAYA?
              </span>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="ml-2 text-xs text-cyan-300/70 transition hover:text-cyan-300"
              >
                Create account →
              </button>
            </div>

          </motion.div>

          {/* Footer */}
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