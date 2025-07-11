"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMenu } from '@/contexts/MenuContext';

export default function Header() {
    const {toggleSidebarCollapse, sidebarCollapsed} = useMenu();
    const { logout } = useAuth(); // Get logout function from AuthContext
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (
        event.target.closest('#user-menu-button') === null &&
        event.target.closest('#user-dropdown-menu') === null
        ) {
        setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);


    return(
        <header className="h-[57px] px-5 py-3 flex items-center justify-between bg-white border-b border-stone-300 relative">
            <button type="button" className="focus:outline-none" onClick={() => toggleSidebarCollapse(!sidebarCollapsed)}>
                <FontAwesomeIcon className="text-xl" icon={faBars} />
            </button>
        </header>
    );
}