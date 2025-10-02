import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation } from './navigation';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onToggle: () => void;
  onToggleCollapse?: () => void;
}

export function Sidebar({ isOpen, isCollapsed = false, onToggle, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        onToggle();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onToggle]);

  // Close sidebar when navigating on mobile
  React.useEffect(() => {
    if (isMobile && isOpen) {
      onToggle();
    }
  }, [location.pathname, isMobile, isOpen, onToggle]);

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          aria-hidden="true"
          onClick={onToggle}
        />
      )}

      <div
        className={classNames(
          'fixed inset-y-0 left-0 z-30 transform transition-all duration-200 ease-in-out',
          'bg-white border-r border-gray-200 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-20' : 'w-64',
          'md:translate-x-0' // Always show on medium screens and up
        )}
      >
        <div className={classNames(
          'flex flex-col h-full border-r border-gray-200 transition-all duration-200 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64'
        )}>
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <h1 className={classNames(
              isCollapsed ? 'opacity-0 w-0 h-0 overflow-hidden' : 'opacity-100',
              'whitespace-nowrap'
            )}>
              Admin Panel
            </h1>
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      isCollapsed ? 'justify-center' : ''
                    )
                  }
                >
                  {React.createElement(item.icon, {
                    className: classNames(
                      location.pathname === item.href ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                      isCollapsed ? 'mx-auto' : 'mr-3',
                      'flex-shrink-0 h-6 w-6'
                    ),
                    'aria-hidden': 'true'
                  })}
                  {!isCollapsed && item.name}
                </NavLink>
              ))}
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" className="flex-shrink-0 group block w-full">
                <div className="flex items-center">
                  <div>
                    <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                      <span className="text-sm font-medium">AD</span>
                    </div>
                  </div>
                  {!isCollapsed && (
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Admin User
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  )}
                </div>
              </a>
              {!isCollapsed && onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Collapse sidebar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
