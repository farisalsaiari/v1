import { NavLink } from "react-router-dom";
import { SidebarProps } from "./types";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SidebarItem } from './types';
import { IconComponent , sidebarData } from '../../data/sidebarData';

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


  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Prevent wheel event from propagating to parent when hovering over sidebar
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isHovered) return;
      
      const sidebar = sidebarRef.current;
      if (!sidebar) return;
      
      const isAtTop = sidebar.scrollTop === 0 && e.deltaY < 0;
      const isAtBottom = sidebar.scrollHeight - sidebar.clientHeight <= sidebar.scrollTop + 1 && e.deltaY > 0;
      
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    };

    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHovered]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true" 
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`${isCollapsed ? 'w-[68px]' : 'w-[280px]'} bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 fixed left-0 top-0 z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 sidebar-${transitionState} ${
          isCollapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden custom-scrollbar'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheelCapture={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className={`${isCollapsed ? ' h-[60px] p-4 border-gray-200 flex items-center' : ' h-[60px] p-6 border-gray-200 flex items-center'}`}>
          <div className={` pt-1 flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3">
              {!isCollapsed && (
                <div className="sidebar-text flex gap-2">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/TIAA_logo_%282016%29.svg" alt="TIAA Logo" style={{ height: '32px', width: 'auto', display: 'block' }} />
                  </div>
                  {/* <h1 className="font-semibold text-[18px] text-gray-900">Catalyst</h1> */}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">

              {/* Desktop Toggle (hidden on mobile) */}
              <button
                onClick={onToggleCollapse}
                className="p-1.5 hover:bg-gray-100 rounded-lg hidden lg:flex items-center justify-center w-8 h-8"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
                {isCollapsed ? (
                  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(-1, 1)">
                    <path d="M4 12L10 6M4 12L10 18M4 12H14.5M20 12H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (


                  <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L10 6M4 12L10 18M4 12H14.5M20 12H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mx-4 h-px bg-gray-200 mb-3" />
        {/* Main Navigation - Scrollable */}
        <div 
          className={`flex-1 ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden custom-scrollbar'}`}
          style={{
            overflowX: 'hidden',
            overflowY: isCollapsed ? 'visible' : 'auto',
          }}
        >
          <div className={`${isCollapsed ? 'px-3' : 'px-3'}  overflow-visible`}>
            <div key={currentMenuId} className={`relative w-full space-y-1 ${slideClasses} transition-transform duration-300`} >



{/* 
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
                  `block p-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-100 font-bold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}  */}






            {menuStack.length > 1 && !isCollapsed && (
                                <button
                                    onClick={handleBack}
                                    className="relative flex text-[13px] text-gray-900 hover:bg-gray-100 rounded hover:text-black px-3 py-[10px] mb-1 w-full" >
                                    <svg data-testid="back-arrow-icon" width="22" height="22" viewBox="0 0 24 24" role="img" aria-hidden="false" aria-label="Back" className="absolute left-3 flex-shrink-0">
                                        <path d="M18 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <span className="font-semibold text-[13px] text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis w-full text-left pl-8">{getCurrentLayerTitle()}</span>
                                </button>
                            )}

                            {currentItems.map((item) => {
                                const isActive = isItemOrChildActive(item);
                                const hasChildren = !!item.children?.length;
                                const isExpanded = expanded[item.id] || menuStack.includes(item.id);

                                // Links with children
                                if (hasChildren) {
                                    return (
                                        <div key={item.id} className="relative group">
                                            <div>
                                                <button
                                                    onClick={() => {
                                                        if (menuStack.length === 1) {
                                                            // Toggle expansion for top-level items
                                                            toggleExpand(item.id);
                                                        }
                                                        handleMainClick(item);
                                                    }}
                                                    className={`cursor-pointer flex ps-[12px]  py-[11px] rounded-md ${isCollapsed ? 'border-white w-11' : 'w-full'}  ${isActive
                                                        ? 'bg-blue-50 text-blue-600 font-semibold'
                                                        : 'hover:bg-gray-100 text-gray-700 font-semibold'}`}>
                                                    <div className="flex items-center w-full">
                                                        {menuStack.length === 1 && item.icon && (
                                                            <div className={`flex items-center justify-center ${isCollapsed ? 'w-full' : ''}`} style={{ width: '20px', height: '20px' }}>
                                                                <IconComponent type={item.icon} />
                                                            </div>
                                                        )}
                                                        {!isCollapsed && <span className="text-[13px] ml-2 sidebar-text overflow-hidden whitespace-nowrap">{item.label}</span>}
                                                    </div>
                                                </button>
                                                {/* Tooltip for collapsed mode */}
                                                {isCollapsed && (
                                                    <div className="absolute left-full ms-[12px] px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] top-1/2 transform -translate-y-1/2 shadow-lg">
                                                        {item.label}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                // Links without children
                                if (item.path) {
                                    return (
                                        <div key={item.id} className="relative group">
                                            <Link
                                                to={item.path}
                                                className={`cursor-pointer flex items-center py-[11px] rounded-md ${menuStack.length === 1 ? 'px-3' : 'pl-3 pr-3'} ${isActive
                                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                                    : 'hover:bg-gray-100 text-gray-700 font-semibold'}`}>
                                                {menuStack.length === 1 && (
                                                    <div className="flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
                                                        {item.icon && <IconComponent type={item.icon} />}
                                                    </div>
                                                )}
                                                {!isCollapsed && <span className="text-[13px] ps-2 sidebar-text overflow-hidden whitespace-nowrap">{item.label}</span>}
                                            </Link>
                                            {/* Tooltip for collapsed mode */}
                                            {isCollapsed && menuStack.length === 1 && (
                                                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] top-1/2 transform -translate-y-1/2 shadow-lg">
                                                    {item.label}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                            })}








          </div>
        </div>
        </div>



        {/* Bottom Items - Fixed at bottom */}
        {!isCollapsed && (
          <div className={`px-4  p-2`}>
            <button className="w-full py-2.5 flex sidebar-text gap-2 bg-gray-100  rounded-md items-center  justify-center">
              <svg className="" data-testid="card-swipe-plus-icon" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="false" aria-label="Card swipe plus">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19 5V2H21V5H24V7H21V10H19V7H16V5H19Z" fill="currentColor"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 7C4.44772 7 4 7.44772 4 8V9H17V11H4V16C4 16.5523 4.44772 17 5 17H18C18.5523 17 19 16.5523 19 16V12H21V16C21 17.6569 19.6569 19 18 19H5C3.34315 19 2 17.6569 2 16V8C2 6.34315 3.34315 5 5 5H14V7H5Z" fill="currentColor"></path>
              </svg>
              <span className=" text-[14px] font-semibold">Take payment</span>
            </button>
          </div>
        )}

        <div className="mx-2 h-px bg-gray-200" />
        <div className={`px-4 py-3 mb-2`}>
          {/* User Profile */}
          <div className={` flex items-center pb-3 ps-[0px] `}>
            <div className="my-[2px]  w-[34px] h-[34px] bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">JB</span>
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 sidebar-text ps-2">
                  <div className="flex items-center gap-1">
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2  overflow-hidden whitespace-nowrap">
                          <span className="text-[13px] font-semibold text-gray-900">Faris Alsaiari</span>
                          <svg fill="" width="16px" height="16px" viewBox="0 0 24 24" id="check-mark-circle" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" >
                            <circle id="primary" cx="12" cy="12" r="10" fill="#059df5"></circle>
                            <path id="secondary" d="M11,15.5a1,1,0,0,1-.71-.29l-3-3a1,1,0,1,1,1.42-1.42L11,13.09l4.29-4.3a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,11,15.5Z" fill=" white"></path>
                          </svg>
                        </div>
                        <span className="text-[12px] font-normal text-gray-400">Title</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSupportClick}
                  className=" p-[6px] sidebar-text items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative">
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true">
                    <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z" fill="#000000" />
                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#000000" />
                    <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="#000000" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Bottom Buttons  */}
          <div className={`flex  ${isCollapsed ? '' : 'justify-between'}`}>

            <div className="relative group">
              <button
                onClick={onNotificationClick}
                className="p-[6px] items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative">
                <svg width="24" height="24" viewBox="0 -1 24 24" fill="currentColor" aria-hidden="true" className="text-black">
                  <path d="M18 17V11C18 8.39 16.33 6.18 14 5.35V5C14 3.9 13.1 3 12 3C10.9 3 10 3.9 10 5V5.35C7.67 6.18 6 8.39 6 11V17H4V19H10C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19H20V17H18ZM8 17V11C8 8.79 9.79 7 12 7C14.21 7 16 8.79 16 11V17H8Z" />
                </svg>
                <span className="absolute top-[4px] right-[8px] w-2 h-2 rounded-full bg-blue-500"></span>
              </button>
              {/* Tooltip */}
              {isCollapsed ? (
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] top-1/2 transform -translate-y-1/2 shadow-lg">
                  Notifications
                </div>
              ) : (
                <div className="absolute bottom-full mb-2 left-0 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Notifications
                  {/* Triangle arrow pointing down - positioned to align with button */}
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>


            {!isCollapsed && (
              <>
                <div className="relative group ">
                  <button
                    onClick={onSupportClick}
                    className=" p-[6px] sidebar-text items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative">
                    <svg className='mt-' width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Search
                    {/* Triangle arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={onSupportClick}
                    className=" p-[6px] sidebar-text items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative">
                    <svg width="24" height="24" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true" >
                      <path d="M19,4 C20.6569,4 22,5.34315 22,7 L22,17 C22,18.6569 20.6569,20 19,20 L5,20 C3.34315,20 2,18.6569 2,17 L2,7 C2,5.34315 3.34315,4 5,4 L19,4 Z M20,10 L4,10 L4,17 C4,17.51285 4.38604429,17.9355092 4.88337975,17.9932725 L5,18 L19,18 C19.51285,18 19.9355092,17.613973 19.9932725,17.1166239 L20,17 L20,10 Z M17,13 C17.5523,13 18,13.4477 18,14 C18,14.51285 17.613973,14.9355092 17.1166239,14.9932725 L17,15 L14,15 C13.4477,15 13,14.5523 13,14 C13,13.48715 13.386027,13.0644908 13.8833761,13.0067275 L14,13 L17,13 Z M19,6 L5,6 C4.44772,6 4,6.44772 4,7 L4,8 L20,8 L20,7 C20,6.44772 19.5523,6 19,6 Z" fill="#09244B" />
                    </svg>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Billing
                    {/* Triangle arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={onSupportClick}
                    className=" p-[6px] sidebar-text items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative">
                    <svg width="24" height="24" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true" >
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM12 17C12.6904 17 13.25 16.4404 13.25 15.75C13.25 15.0596 12.6904 14.5 12 14.5C11.3096 14.5 10.75 15.0596 10.75 15.75C10.75 16.4404 11.3096 17 12 17ZM9 9.75C9 8.23 10.35 7 12 7C13.65 7 15 8.23 15 9.75C15 10.86 14.34 11.52 13.81 12.04C13.28 12.57 13 12.87 13 13.5H11C11 12.0198 11.7993 11.2206 12.3883 10.6317L12.4 10.62C12.84 10.19 13 10.01 13 9.75C13 9.34 12.54 9 12 9C11.46 9 11 9.34 11 9.75H9Z" fill="black" />
                    </svg>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Help & Support
                    {/* Triangle arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={onSettingsClick}
                    className=" p-[6px] sidebar-text items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true">
                      <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z" fill="#000000" />
                      <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#000000" />
                      <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="#000000" />
                    </svg>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Settings
                    {/* Triangle arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>


       {/* Mobile Bottom Fixed Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex items-center justify-between px-4 py-2 z-50 lg:hidden">
                {/* Left: Burger menu and Home */}
                <div className="flex items-center gap-0">
                    <button
                        onClick={onToggleSidebar}
                        className="p-1.5 hover:bg-gray-100 rounded-lg lg:hidden">
                        <svg className="w-6 h-6 text-gray-500" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>app-menu</title>
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="app-main-menu" fill="currentColor" transform="translate(42.666667, 106.666667)">
                                    <path d="M0,0 L426.666667,0 L426.666667,42.6666667 L0,42.6666667 Z M0,128 L426.666667,128 L426.666667,170.666667 L0,170.666667 Z M0,256 L426.666667,256 L426.666667,298.666667 L0,298.666667 Z" />
                                </g>
                            </g>
                        </svg>
                    </button>

                    <Link to="/" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100">
                        <span className="text-[15px] font-semibold text-gray-700">Home</span>
                    </Link>
                </div>
                {/* Right: Desktop Bottom Buttons */}
                <div className="flex items-center gap-2">
                    {/* Notification */}
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-black">
                            <path d="M18 17V11C18 8.39 16.33 6.18 14 5.35V5C14 3.9 13.1 3 12 3C10.9 3 10 3.9 10 5V5.35C7.67 6.18 6 8.39 6 11V17H4V19H10C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19H20V17H18ZM8 17V11C8 8.79 9.79 7 12 7C14.21 7 16 8.79 16 11V17H8Z" />
                        </svg>
                        <span className="absolute top-[2px] right-[5px] w-2 h-2 rounded-full bg-blue-500"></span>
                    </button>
                    {/* search */}
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
                        <svg className='mt-' width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    {/* Billing */}
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
                        <svg width="24" height="24" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true" className="text-black">
                            <path d="M19,4 C20.6569,4 22,5.34315 22,7 L22,17 C22,18.6569 20.6569,20 19,20 L5,20 C3.34315,20 2,18.6569 2,17 L2,7 C2,5.34315 3.34315,4 5,4 L19,4 Z M20,10 L4,10 L4,17 C4,17.51285 4.38604429,17.9355092 4.88337975,17.9932725 L5,18 L19,18 C19.51285,18 19.9355092,17.613973 19.9932725,17.1166239 L20,17 L20,10 Z M17,13 C17.5523,13 18,13.4477 18,14 C18,14.51285 17.613973,14.9355092 17.1166239,14.9932725 L17,15 L14,15 C13.4477,15 13,14.5523 13,14 C13,13.48715 13.386027,13.0644908 13.8833761,13.0067275 L14,13 L17,13 Z M19,6 L5,6 C4.44772,6 4,6.44772 4,7 L4,8 L20,8 L20,7 C20,6.44772 19.5523,6 19,6 Z" fill="#09244B" />
                        </svg>
                    </button>
                    {/* Help & Support */}
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
                        <svg width="24" height="24" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true" className="text-black">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM12 17C12.6904 17 13.25 16.4404 13.25 15.75C13.25 15.0596 12.6904 14.5 12 14.5C11.3096 14.5 10.75 15.0596 10.75 15.75C10.75 16.4404 11.3096 17 12 17ZM9 9.75C9 8.23 10.35 7 12 7C13.65 7 15 8.23 15 9.75C15 10.86 14.34 11.52 13.81 12.04C13.28 12.57 13 12.87 13 13.5H11C11 12.0198 11.7993 11.2206 12.3883 10.6317L12.4 10.62C12.84 10.19 13 10.01 13 9.75C13 9.34 12.54 9 12 9C11.46 9 11 9.34 11 9.75H9Z" fill="black" />
                        </svg>
                    </button>
                    {/* Settings */}
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
                        <svg width="24" height="24" viewBox="0 0 23 23" fill="currentColor" aria-hidden="true" className="text-black">
                            <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z" fill="#000000" />
                            <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#000000" />
                            <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="#000000" />
                        </svg>
                    </button>
                </div>
            </div>
    </>
  );
}
