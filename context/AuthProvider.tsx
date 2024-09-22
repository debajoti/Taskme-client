import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    logout(){},
    login(){},
    loading: true,
    tokenValue : "",
});

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenValue, setTokenValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenValue(token || "");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      router.push('/sign-in');
    } catch (error) {
      console.error(error)
    }
  };
  const login = async () => {
    try {
      console.error('Login function called');
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, tokenValue, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
