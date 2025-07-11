'use client';

import '@fortawesome/fontawesome-svg-core/styles.css'; 
import { config } from '@fortawesome/fontawesome-svg-core';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { MenuProvider } from '@/contexts/MenuContext';

import Sidebar from '@/components/layouts/Sidebar';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

config.autoAddCss = false; 

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AppContent({ children }) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && isSidebarOpenMobile) {
        setIsSidebarOpenMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpenMobile]);

  const handleToggleSidebarMobile = () => {
    setIsSidebarOpenMobile(!isSidebarOpenMobile);
  };


  const protectedRoutes = ['/', '/settings', '/dashboard', '/products']; 
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isLoginPage = pathname === '/login';
  const isLogoutPage = pathname === '/logout';

  useEffect(() => {
    if (!isLoggedIn && isProtectedRoute && !isLoginPage && !isLogoutPage) {
      router.push('/login');
    } else if (isLoggedIn && isLoginPage) {
      router.push('/settings'); 
    }
  }, [isLoggedIn, isProtectedRoute, isLoginPage, isLogoutPage, pathname, router]);

  if (!isLoggedIn && isProtectedRoute && !isLoginPage && !isLogoutPage) {
    return null; 
  }

  if (isLoggedIn && isLoginPage) {
    return null; 
  }

  return (
    <div className="flex flex-1">
      {isLoggedIn && !isLogoutPage &&
       <Sidebar
          isMobile={isMobile}
          isSidebarOpenMobile={isSidebarOpenMobile}
          handleToggleSidebarMobile={handleToggleSidebarMobile}
      />
      }
      <div id="main-content-wrapper" className="flex-1 flex flex-col transition-all duration-200 ease-in-out">
        {isLoggedIn && !isLogoutPage && 
          <Header
            isMobile={isMobile}
            isSidebarOpenMobile={isSidebarOpenMobile}
            handleToggleSidebarMobile={handleToggleSidebarMobile}
          />
        }
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider> 
          <MenuProvider> 
            <AppContent>{children}</AppContent>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
