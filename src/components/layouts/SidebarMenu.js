'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useMenu } from '@/contexts/MenuContext';

export default function SidebarMenu({ isCollapsed, isMobile }) {
    const { menuData, toggleGroupExpanded } = useMenu();

    const renderMenuItem = (href, icon, text, key, isDynamic = false) => (
        <Link
        key={key}
        href={href}
        className={`flex items-center py-2.5 px-4 rounded-md transition duration-200 hover:bg-emerald-700 hover:text-white ${isDynamic ? 'mb-1' : 'mb-2'}`}
        >
            <FontAwesomeIcon className="mr-2" icon={icon} />
            <span className={`whitespace-nowrap ${isCollapsed && !isMobile ? 'hidden' : ''}`}>{text}</span>
        </Link>
    );

    return (
        <nav id="sidebar-nav-links" className="flex flex-col flex-1 px-4">
            {renderMenuItem(
                "/",
                faHome,
                "Home",
                "static-dashboard"
            )}
            {renderMenuItem(
                "/settings",
                faWrench,
                "Settings",
                "static-settings"
            )}
            {renderMenuItem(
                "/logout",
                faUser,
                "Logout",
                "static-logout"
            )}

            <div id="dynamic-sidebar-menus" className="mt-4 pt-4 border-t border-gray-700">
                {Object.keys(menuData).map((groupId) => {
                const group = menuData[groupId];
                return (
                    <div key={groupId}>
                        <div
                            className={`sidebar-group-header text-gray-400 uppercase tracking-wider text-xs font-semibold ${group.expanded ? '' : 'collapsed'} ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'}`}
                            onClick={() => toggleGroupExpanded(groupId)}
                        >
                            <span className={`${isCollapsed && !isMobile ? 'hidden' : ''}`}>{group.name}</span>
                            <svg
                            className={`w-4 h-4 ml-2 arrow-icon ${isCollapsed && !isMobile ? 'hidden' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        <div className={`sidebar-group-menus ${group.expanded ? 'expanded' : ''}`}>
                            {group.menus.map((menu) => (
                            renderMenuItem(
                                menu.url,
                                faCircle,
                                menu.name,
                                menu.id,
                                true 
                            )
                            ))}
                        </div>
                    </div>
                );
                })}
            </div>
        </nav>
    );
}
