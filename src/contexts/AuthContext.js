'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');
    if (storedLoggedIn === 'true' && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isLoggedIn, user]);

  const login = useCallback((email, password) => {
    if (email === 'admin@example.com' && password === 'password') {
      setIsLoggedIn(true);
      setUser({ email: 'admin@example.com', name: 'Admin User' });
      router.push('/settings'); 
      return true;
    } else {
      alert('Invalid credentials. Please try again.');
      return false;
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
        router.push('/login');
      } else {
        console.error('Logout API failed:', await response.json());
        alert('Failed to log out. Please try again.'); 
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.'); 
    }
  }, [router]);

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
