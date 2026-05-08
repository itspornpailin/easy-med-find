import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "patient" | "clinic_admin" | "platform_admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (role: Role) => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "medcentral_auth_user";

const MOCK_USERS: Record<Role, AuthUser> = {
  patient: { id: "u_patient", name: "Mint", email: "patient@medcentral.app", role: "patient" },
  clinic_admin: { id: "u_clinic", name: "Aura Clinic Admin", email: "clinic@medcentral.app", role: "clinic_admin" },
  platform_admin: { id: "u_admin", name: "Platform Admin", email: "admin@medcentral.app", role: "platform_admin" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = (role: Role) => persist(MOCK_USERS[role]);
  const loginWithEmail = (email: string) =>
    persist({ ...MOCK_USERS.patient, email: email || MOCK_USERS.patient.email });
  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, login, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
