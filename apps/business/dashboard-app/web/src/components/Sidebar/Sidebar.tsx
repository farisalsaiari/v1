import { NavLink } from "react-router-dom";
import { SidebarProps } from "./types";
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SidebarItem } from './types';
import { sidebarData } from '../../data/sidebarData';

export function Sidebar({
  isOpen,
  isCollapsed,
  onToggleSidebar,
  onToggleCollapse,
    onNotificationClick,
    onSupportClick,
    onSettingsClick
}: SidebarProps) {
  const navigate = useNavigate();
    const location = useLocation();

    const [transitionState, setTransitionState] = useState<'expanded' | 'collapsed' | 'expanding' | 'collapsing'>(
        isCollapsed ? 'collapsed' : 'expanded'
    );

    useEffect(() => {
        if (isCollapsed) {
            setTransitionState('collapsing');
            const timer = setTimeout(() => setTransitionState('collapsed'), 100);
            return () => clearTimeout(timer);
        } else {
            setTransitionState('expanding');
            const timer = setTimeout(() => setTransitionState('expanded'), 100);
            return () => clearTimeout(timer);
        }
    }, [isCollapsed]);

    const [menuStack, setMenuStack] = useState<string[]>(['main']);
    const currentMenuId = menuStack[menuStack.length - 1];
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (isCollapsed && menuStack.length > 1) {
            setMenuStack(['main']);
        }
    }, [isCollapsed, menuStack.length]);

    const findById = (items: SidebarItem[], id: string): SidebarItem | undefined => {
        for (const item of items) {
            if (item.id === id) return item;
            if (item.children) {
                const found = findById(item.children, id);
                if (found) return found;
            }
        }
        return undefined;
    };

    const currentItems = useMemo(() => {
        return currentMenuId === 'main'
            ? sidebarData
            : findById(sidebarData, currentMenuId)?.children ?? [];
    }, [currentMenuId]);

    const getCurrentLayerTitle = () => {
        if (currentMenuId === 'main') return 'Main';
        const currentItem = findById(sidebarData, currentMenuId);
        return currentItem?.label || 'Back';
    };

    const isItemOrChildActive = (item: SidebarItem): boolean => {
        if (item.path === location.pathname) return true;
        if (item.children) {
            return item.children.some(child => isItemOrChildActive(child));
        }
        return false;
    };

    const getFirstChildPath = (item: SidebarItem): string | null => {
        if (item.children && item.children.length > 0) {
            const firstChild = item.children[0];
            return firstChild.path || getFirstChildPath(firstChild);
        }
        return null;
    };

    const handleMainClick = (item: SidebarItem) => {
        if (item.children) {
            if (isCollapsed) {
                const firstChildPath = getFirstChildPath(item);
                if (firstChildPath) {
                    navigate(firstChildPath);
                }
            } else {
                setDirection('forward');
                setMenuStack((prev) => [...prev, item.id]);
                setHasInteracted(true);

                if (item.path) {
                    navigate(item.path);
                }
            }
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const handleBack = () => {
        setDirection('backward');
        setMenuStack((prev) => {
            const newStack = prev.slice(0, -1);
            // Reset expanded state for the parent item when going back
            if (newStack.length > 0) {
                const parentId = newStack[newStack.length - 1];
                if (parentId !== 'main') {
                    setExpanded(prev => ({
                        ...prev,
                        [parentId]: false
                    }));
                }
            }
            return newStack;
        });
    };

    const toggleExpand = (itemId: string) => {
        setExpanded((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const slideClasses = hasInteracted
        ? direction === 'forward'
            ? 'animate-push-forward'
            : 'animate-push-backward'
        : '';

    // Handle overlay click to close sidebar
    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isOpen) {
            onToggleSidebar();
        }
    };
  return (
    <div
      className={`flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      } bg-white border-r p-4 space-y-2 transition-all duration-300`}
    >
      <button
        onClick={onToggleSidebar}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {isOpen ? "Close" : "Open"} Sidebar
      </button>
      <button
        onClick={onToggleCollapse}
        className="mb-4 p-2 bg-gray-200 rounded"
      >
        {isCollapsed ? "Expand" : "Collapse"}
      </button>

      {[
        { path: "/", label: "Dashboard" },
        { path: "/orders", label: "Orders" },
        { path: "/menu", label: "Menu" },
        { path: "/settings", label: "Settings" },
        { path: "/profile", label: "Profile" },
        { path: "/help", label: "Help" },
      ].map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-gray-200 ${
              isActive ? "bg-blue-100 font-bold" : ""
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
