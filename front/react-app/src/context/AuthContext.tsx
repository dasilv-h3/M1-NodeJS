import React, { createContext, useState, useEffect, useContext } from "react";
import { Users } from "../interfaces/UsersInterfaces";

// Interface pour le contexte d'authentification
interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  user: Users | null;
  setUser: (user: Users | null) => void;
}

// Création du contexte
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<Users | null>(null);

  // Charger les données depuis le stockage local au montage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // Mise à jour du token dans l'état et le stockage local
  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  // Mise à jour de l'utilisateur dans l'état et le stockage local
  const setUser = (user: Users | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
