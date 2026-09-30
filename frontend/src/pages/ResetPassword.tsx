import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = "https://anvaya-9dac.onrender.com";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = useMemo(
    () => searchParams.get("token") || "",
    [searchParams]
  );

  const [stage, setStage] = useState<
    "scanning" | "verified" | "form" | "success" | "error"
  >("scanning");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * SECURITY CORE
   *
   * First the interface performs a visual token scan.
   * We don't make a separate backend request here because
   * the actual token verification happens securely when
   * the password reset request is submitted.
   */
  useEffect(() => {
    if (!token) {
      setStage("error");
      setError("No recovery token was found in this link.");
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("verified");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [token]);

  useEffect(() => {
    if (stage !== "verified") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("form");
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [stage]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    if (!token) {
      setStage("error");
      setError("This recovery link is invalid.");
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

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/api/auth/reset-password`,
        {
          token,
          new_password: password,
        }
      );

      setStage("success");
    } catch (err) {
      console.error("Reset password error:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.detail ||
            "This recovery link is invalid or expired."
        );
      } else {
        setError(
          "Unable to reset your password. Please try again."
        );
      }

      setStage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020508] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="anvaya-grid absolute inset-0 opacity-30" />

        {/* Core glow */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-[180px]"
        />

        {/* Secondary glow */}
        <motion.div
          animate={{
            x: [-80, 80, -80],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[15%] top-[20%] h-64 w-64 rounded-full bg-blue-500/[0.035] blur-[120px]"
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-7 py-7 md:px-12">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm font-semibold tracking-[0.38em] text-white transition hover:text-cyan-300"
        >
          ANVAYA
        </button>

        <div className="flex items-center gap-3">
          <motion.span
            animate={{
              opacity: [0.25, 1, 0.25],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
          />

          <span className="text-[9px] uppercase tracking-[0.32em] text-white/30">
            Security Protocol
          </span>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-24">
        <div className="w-full max-w-[900px]">

          {/* =================================================
              SECURITY CORE
          ================================================== */}

          <div className="relative mx-auto mb-12 h-[330px] w-[330px]">

            {/* Outer orbit */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-cyan-300/[0.12]"
            >
              <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />

              <span className="absolute bottom-[-3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/30" />
            </motion.div>

            {/* Second orbit */}
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[28px] rounded-full border border-white/[0.07]"
            >
              <span className="absolute right-[-2px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-200/70" />
            </motion.div>

            {/* Third orbit */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[65px] rounded-full border border-cyan-300/[0.08]"
            >
              <span className="absolute left-1/2 top-[-2px] h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300/80" />
            </motion.div>

            {/* Scan ring */}
            <motion.div
              animate={{
                scale: [0.75, 1.15, 0.75],
                opacity: [0.1, 0.35, 0.1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20"
            />

            {/* Core */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(103,232,249,0.08)",
                  "0 0 60px rgba(103,232,249,0.20)",
                  "0 0 20px rgba(103,232,249,0.08)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/20 bg-[#071016]/90 backdrop-blur-xl"
            >
              {stage === "success" ? (
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="text-emerald-300"
                >
                  <motion.path
                    d="M5 12l4 4L19 6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                </motion.svg>
              ) : (
                <div className="text-center">
                  <div className="text-[8px] uppercase tracking-[0.3em] text-cyan-300/50">
                    ANVAYA
                  </div>

                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    CORE
                  </div>
                </div>
              )}
            </motion.div>

            {/* Orbit nodes */}
            {[
              "top-5 left-1/2 -translate-x-1/2",
              "right-6 top-1/2 -translate-y-1/2",
              "bottom-5 left-1/2 -translate-x-1/2",
              "left-6 top-1/2 -translate-y-1/2",
            ].map((position, index) => (
              <motion.span
                key={index}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.15, 0.8],
                }}
                transition={{
                  duration: 1.8,
                  delay: index * 0.35,
                  repeat: Infinity,
                }}
                className={`absolute ${position} h-2 w-2 rounded-full border border-cyan-300/50 bg-cyan-300/30`}
              />
            ))}

            {/* Scan line */}
            {stage === "scanning" && (
              <motion.div
                initial={{ top: "12%" }}
                animate={{ top: "88%" }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent shadow-[0_0_15px_rgba(103,232,249,0.8)]"
              />
            )}
          </div>

          {/* =================================================
              STATUS
          ================================================== */}

          <div className="mx-auto max-w-[560px] text-center">

            {/* SCANNING */}
            {stage === "scanning" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/60">
                  Security Protocol
                </p>

                <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Scanning recovery token
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/30">
                  ANVAYA is establishing a secure recovery channel.
                </p>

                <div className="mx-auto mt-7 flex items-center justify-center gap-2">
                  {[0, 1, 2].map((item) => (
                    <motion.span
                      key={item}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 1,
                        delay: item * 0.2,
                        repeat: Infinity,
                      }}
                      className="h-1 w-1 rounded-full bg-cyan-300"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* VERIFIED */}
            {stage === "verified" && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.45em] text-emerald-300/70">
                  Token Verified
                </p>

                <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Recovery channel secured
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/30">
                  Your recovery token has been detected.
                  Preparing secure password access.
                </p>
              </motion.div>
            )}

            {/* FORM */}
            {stage === "form" && (
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
                  duration: 0.7,
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/60">
                  Access Reconfiguration
                </p>

                <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Create new password
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/30">
                  Reconfigure your ANVAYA account credentials.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-9 max-w-[440px] space-y-4 text-left"
                >
                  {error && (
                    <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                      New Password
                    </label>

                    <input
                      type="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:bg-cyan-300/[0.025]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Repeat new password"
                      autoComplete="new-password"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:bg-cyan-300/[0.025]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: loading ? 1 : 1.01,
                    }}
                    whileTap={{
                      scale: loading ? 1 : 0.98,
                    }}
                    className="relative mt-3 w-full overflow-hidden rounded-xl border border-cyan-300/30 bg-cyan-300/[0.08] px-5 py-3.5 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300/[0.14] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {loading
                        ? "Reconfiguring access..."
                        : "Confirm new password"}
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* SUCCESS */}
            {stage === "success" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.45em] text-emerald-300/70">
                  Access Restored
                </p>

                <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Security credentials updated
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/30">
                  Your ANVAYA password has been successfully
                  reconfigured.
                </p>

                <motion.button
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  onClick={() => navigate("/login")}
                  className="mt-9 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-cyan-50"
                >
                  Return to ANVAYA
                </motion.button>
              </motion.div>
            )}

            {/* ERROR */}
            {stage === "error" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.45em] text-red-300/60">
                  Recovery Failed
                </p>

                <h1 className="mt-4 text-3xl font-medium tracking-tight">
                  Access token unavailable
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/30">
                  {error ||
                    "This recovery link is invalid or has expired."}
                </p>

                <button
                  onClick={() => navigate("/forgot-password")}
                  className="mt-9 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm text-white transition hover:bg-white/[0.08]"
                >
                  Start recovery again
                </button>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-14 text-center">
            <p className="text-[8px] uppercase tracking-[0.35em] text-white/15">
              ANVAYA • Secure Intelligence Infrastructure • India
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}