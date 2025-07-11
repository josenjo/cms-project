"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMenu } from '@/contexts/MenuContext';
import { useAuth } from '@/contexts/AuthContext';

import SidebarMenu from './SidebarMenu';

export default function Sidebar() {
    const {sidebarCollapsed, toggleSidebarCollapse} = useMenu();
    const { isLoggedIn } = useAuth();
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768 && sidebarOpenMobile) {
                setSidebarOpenMobile(false); 
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        if (window.innerWidth >= 768) {
            if (localStorage.getItem('sidebarCollapsed') === 'true') {
                toggleSidebarCollapse(true);
            } else {
                toggleSidebarCollapse(false);
            }
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [sidebarOpenMobile, toggleSidebarCollapse]);

    const handleToggleSidebarMobile = () => {
        setSidebarOpenMobile(!sidebarOpenMobile);
    };

    const handleToggleSidebarDesktop = () => {
        toggleSidebarCollapse(!sidebarCollapsed);
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <aside 
            className = {`
                sidebar bg-emerald-800 text-stone-50 space-y-6 absolute inset-y-0 left-0 transform md:relative transition-all duration-200 ease-in-out shadow-lg md:shadow-none
                ${isMobile ? '-translate-x-full rounded-r-lg' : ''}
                ${sidebarOpenMobile ? 'translate-x-0 w-64' : ''}
                ${!isMobile && sidebarCollapsed ? 'md:w-20' : !isMobile && 'md:w-64'}
            `}
        >
            <div className="px-6 py-3 flex items-center">
                <Image
                    className="w-8 h-8 rounded-full mr-3"
                    src="/logo.png"
                    alt="CMS logo"
                    width={180}
                    height={38}
                    priority
                />
                <span className={`whitespace-nowrap ${sidebarCollapsed && !isMobile ? 'hidden' : ''}`}>CMS Project</span> 
            </div>
            <nav className="flex flex-col flex-1">
                <div className="px-6 py-3 flex items-center">
                    <Image
                        className="w-10 h-10 rounded-full mr-2"
                        src="/avatar.png"
                        alt="avatar"
                        width={180}
                        height={38}
                        priority
                    />
                    <span className={`whitespace-nowrap ${sidebarCollapsed && !isMobile ? 'hidden' : ''}`}>Josen Jovianto</span> 
                </div>
                
                <SidebarMenu isCollapsed={sidebarCollapsed} isMobile={isMobile} />
            </nav>
        </aside>
    );
};