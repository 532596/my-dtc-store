"use client";

import * as React from "react";

const STORAGE_KEY = "dtc-user-display-name";
const STORAGE_KEY_EMAIL = "dtc-user-email";

type AuthContextValue = {
  displayName: string | null;
  email: string | null;
  isLoggedIn: boolean;
  setUser: (name: string, email?: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue>({
  displayName: null,
  email: null,
  isLoggedIn: false,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [displayName, setDisplayName] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setDisplayName(stored ? JSON.parse(stored) : null);
    } catch {
      setDisplayName(null);
    }
    try {
      const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
      setEmail(storedEmail ? JSON.parse(storedEmail) : null);
    } catch {
      setEmail(null);
    }
    setMounted(true);
  }, []);

  const setUser = React.useCallback((name: string, userEmail?: string) => {
    const trimmed = name.trim() || null;
    setDisplayName(trimmed);
    setEmail((prev) => {
      const next = userEmail !== undefined ? (userEmail && userEmail.trim()) || null : prev;
      try {
        if (next) localStorage.setItem(STORAGE_KEY_EMAIL, JSON.stringify(next));
        else localStorage.removeItem(STORAGE_KEY_EMAIL);
      } catch {}
      return next;
    });
    try {
      if (trimmed) localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const logout = React.useCallback(() => {
    setDisplayName(null);
    setEmail(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY_EMAIL);
    } catch {}
  }, []);

  const value = React.useMemo(
    () => ({
      displayName,
      email,
      isLoggedIn: mounted && !!displayName,
      setUser,
      logout,
    }),
    [displayName, email, mounted, setUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

/** 从账号名称取缩写，用于头像展示：两字取首字，单字取首字，英文取首字母等 */
export function getInitials(name: string | null): string {
  if (!name || !name.trim()) return "?";
  const s = name.trim();
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0];
    const b = parts[parts.length - 1];
    return (a[0] + b[0]).toUpperCase().slice(0, 2);
  }
  if (s.length >= 2) return s.slice(0, 2).toUpperCase();
  return s[0].toUpperCase();
}
