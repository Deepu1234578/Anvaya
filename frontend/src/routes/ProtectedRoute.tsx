import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080d] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold tracking-[0.3em]">
            ANVAYA
          </div>

          <p className="mt-3 text-sm text-white/40">
            Initializing intelligence...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}