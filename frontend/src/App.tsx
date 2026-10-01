import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TitleScreen from "./pages/TitleScreen";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#05080d] text-white flex items-center justify-center">
      <h1 className="text-3xl font-semibold">
        ANVAYA Dashboard
      </h1>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  /*
   * Title screen is only for the Home / Index page.
   * Login, Register, Forgot Password, Reset Password,
   * and Dashboard open directly without the title screen.
   */
  const isHomePage = location.pathname === "/";

  const [showTitle, setShowTitle] = useState(isHomePage);

  /*
   * Home is intentionally NOT mounted while the title screen
   * is playing. This allows all existing Home/Hero animations
   * to start from the beginning after the title finishes.
   */
  const showHome = !isHomePage || !showTitle;

  return (
    <>
      <AnimatePresence mode="wait">
        {isHomePage && showTitle && (
          <TitleScreen
            onComplete={() => {
              setShowTitle(false);
            }}
          />
        )}
      </AnimatePresence>

      <Routes>
        <Route
          path="/"
          element={showHome ? <Home /> : null}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;