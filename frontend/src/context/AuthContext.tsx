import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  loginUser,
  type LoginRequest,
  type User,
} from "../api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("anvaya_token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);

        setUser(currentUser);
      } catch {
        localStorage.removeItem("anvaya_token");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (data: LoginRequest) => {
    const response = await loginUser(data);

    localStorage.setItem(
      "anvaya_token",
      response.access_token
    );

    setToken(response.access_token);

    const currentUser = await getCurrentUser(
      response.access_token
    );

    setUser(currentUser);
  };

  const googleLogin = async (credential: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/google",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Google authentication failed."
      );
    }

    localStorage.setItem(
      "anvaya_token",
      data.access_token
    );

    setToken(data.access_token);

    const currentUser = await getCurrentUser(
      data.access_token
    );

    setUser(currentUser);
  };

  const logout = () => {
    localStorage.removeItem("anvaya_token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}