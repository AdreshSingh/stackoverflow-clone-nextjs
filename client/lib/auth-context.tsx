"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./axios-instance";
import { toast } from "react-toastify";

type userType = {
  _id: string;
  name: string;
  email: string;
  about: string;
  tags: string[];
  joinDate: string;
};

const AuthContext = createContext({
  user: null as userType | null,
  signup: async ({}: any) => {},
  login: async ({}: any) => {},
  logout: () => {},
  loading: false,
  error: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async ({ name, email, password }: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      const { data, token } = res.data;
      localStorage.setItem("token", JSON.stringify({ ...data, token }));
      setUser(data);

      toast.success("Signup successful!");
    } catch (err: any) {
      const message = err?.message || "Signup failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { data, token } = res.data;
      localStorage.setItem("token", JSON.stringify({ ...data, token }));
      setUser(data);
      toast.success("Login successful!");
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
