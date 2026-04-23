import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS } from "../lib/api-config";
import { setAccessToken } from "../lib/api-client";

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
  login: (data: any) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync token to api-client whenever it changes
  const updateAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    setAccessToken(token);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        updateAccessToken(data.accessToken);
        return data.accessToken;
      } else {
        updateAccessToken(null);
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      updateAccessToken(null);
      setUser(null);
      return null;
    }
  }, [updateAccessToken]);

  const register = async (formData: any) => {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    setUser(data.user);
    updateAccessToken(data.accessToken);
    
    // Save user info to local storage for persistence (except tokens)
    localStorage.setItem("masso_user", JSON.stringify(data.user));
  };

  const login = async (formData: any) => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    setUser(data.user);
    updateAccessToken(data.accessToken);
    
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
      updateAccessToken(null);
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
        login,
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
