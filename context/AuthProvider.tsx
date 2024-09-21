import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    logout(){},
    login(){},
    loading: true,
    tokenValue : "",
});

export const AuthProvider = ({ children } : any) => {
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
      console.log('Logout function called');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      router.push('/sign-in');
    } catch (error) {
      console.log(error)
    }
  };
  const login = async () => {
    try {
      console.log('Login function called');
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, tokenValue, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
