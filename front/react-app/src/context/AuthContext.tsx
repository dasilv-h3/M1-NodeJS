import React, { createContext, useState, useContext } from "react";
import { Users } from "../interfaces/UsersInterfaces";

// Interface pour le contexte d'authentification
interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  user: Users | null; // Harmonisation ici (objet unique ou null)
  setUser: (user: Users | null) => void; // Permet de définir un utilisateur ou null
}

// Création du contexte
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Fournisseur de contexte
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null); // Token JWT ou autre
  const [user, setUser] = useState<Users | null>(null); // Utilisateur actuellement connecté

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte d'authentification
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
