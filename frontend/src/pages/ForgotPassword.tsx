import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020509] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="anvaya-grid absolute inset-0 opacity-40" />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[150px]"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex min-h-screen items-center justify-center px-5 py-20"
      >
        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <div className="mb-10 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-cyan-300/40" />

              <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-300/60">
                Account Recovery
              </span>

              <span className="h-px w-8 bg-cyan-300/40" />
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em]">
              Reset access.
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Recover access to your ANVAYA intelligence network.
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

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="relative space-y-5"
              >
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
                    className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </motion.div>
                )}

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
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-cyan-300/50 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_30px_rgba(34,211,238,0.05)]"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{
                    scale: loading ? 1 : 1.01,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  className="w-full rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-semibold text-[#020509] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending recovery link..."
                    : "Send recovery link →"}
                </motion.button>
              </form>
            ) : (
              /* Success */
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] text-xl text-cyan-300">
                  ✓
                </div>

                <h2 className="mt-6 text-xl font-medium">
                  Check your email
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  If an ANVAYA account exists for that email,
                  you will receive instructions to reset your
                  password.
                </p>
              </motion.div>
            )}

            {/* Back to Login */}
            <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-xs text-cyan-300/70 transition hover:text-cyan-300"
              >
                ← Back to Login
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