'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MenuContext = createContext();

export function MenuProvider({ children }) {
    const [menuData, setMenuData] = useState({});
    const [sidebarCollapsed, setsidebarCollapsed] = useState(false);

    useEffect(() => {
        const storedMenuData = localStorage.getItem('cmsMenuData');
        if (storedMenuData) {
        setMenuData(JSON.parse(storedMenuData));
        }
        const storedSidebarCollapsed = localStorage.getItem('sidebarCollapsed');
        if (storedSidebarCollapsed !== null) {
        setsidebarCollapsed(storedSidebarCollapsed === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cmsMenuData', JSON.stringify(menuData));
    }, [menuData]);

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
    }, [sidebarCollapsed]);

    const addMenuGroup = useCallback((name) => {
        setMenuData((prevData) => {
            const groupId = 'group-' + Date.now();
            return {
                ...prevData,
                [groupId]: { name, expanded: true, menus: [] },
            };
        });
    }, []);

    const removeMenuGroup = useCallback((groupId) => {
        setMenuData((prevData) => {
            const newData = { ...prevData };
            delete newData[groupId];
            return newData;
        });
    }, []);

    const addMenu = useCallback((groupId, name, url) => {
        setMenuData((prevData) => {
            const menuId = 'menu-' + Date.now();
            const updatedGroup = {
                ...prevData[groupId],
                menus: [...prevData[groupId].menus, { id: menuId, name, url }],
            };
            return {
                ...prevData,
                [groupId]: updatedGroup,
            };
        });
    }, []);

    const removeMenu = useCallback((groupId, menuId) => {
        setMenuData((prevData) => {
            const updatedGroup = {
                ...prevData[groupId],
                menus: prevData[groupId].menus.filter((menu) => menu.id !== menuId),
            };
            return {
                ...prevData,
                [groupId]: updatedGroup,
            };
        });
    }, []);

    const toggleGroupExpanded = useCallback((groupId) => {
        setMenuData((prevData) => ({
            ...prevData,
            [groupId]: {
                ...prevData[groupId],
                expanded: !prevData[groupId].expanded,
            },
        }));
    }, []);

    const toggleSidebarCollapse = useCallback((collapseState) => {
        setsidebarCollapsed(collapseState);
    }, []);

    const value = {
        menuData,
        sidebarCollapsed,
        addMenuGroup,
        removeMenuGroup,
        addMenu,
        removeMenu,
        toggleGroupExpanded,
        toggleSidebarCollapse,
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}

