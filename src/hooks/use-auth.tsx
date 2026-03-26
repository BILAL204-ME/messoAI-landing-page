import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS } from "../lib/api-config";

interface User {
  id: string;
  fullname: string;
  email: string;
  phone_number: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        return data.accessToken;
      } else {
        setAccessToken(null);
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, []);

  const register = async (formData: any) => {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    setUser(data.user);
    setAccessToken(data.accessToken);
    
    // Save user info to local storage for persistence (except tokens)
    localStorage.setItem("masso_user", JSON.stringify(data.user));
  };

  const logout = async () => {
    try {
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("masso_user");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("masso_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Attempt to refresh token on mount to get accessToken
    const initAuth = async () => {
      await refreshAccessToken();
      setIsLoading(false);
    };
    initAuth();
  }, [refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        register,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
