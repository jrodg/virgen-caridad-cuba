import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const ADMIN_USER = "admin";
const ADMIN_PASS = "Cobre1612@NJ4LaCofradia2026";
const SESSION_KEY = "virgen.admin";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isAdmin,
      login: (username, password) => {
        if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
          sessionStorage.setItem(SESSION_KEY, "1");
          setIsAdmin(true);
          return true;
        }
        return false;
      },
      logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
        setIsAdmin(false);
      },
    }),
    [isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
