import React from 'react';
import { Outlet, useLocation, Location, useNavigate } from 'react-router-dom';
import { Suspense, useState, useEffect, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Spinner } from '../ui/Spinner';
import { navigation } from './navigation';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Extend the Location type to include the pathname property
interface AppLocation extends Location {
  pathname: string;
}

interface LayoutProps {
  children?: ReactNode;
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
}

export function Layout({ 
  children, 
  isOpen,
  isCollapsed, 
  onToggleSidebar, 
  onToggleCollapse 
}: LayoutProps) {
  const location = useLocation() as AppLocation;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    // Handle mobile detection
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        onToggleSidebar();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname, onToggleSidebar]);

  const getPageTitle = (): string => {
    const path = location?.pathname?.split('/').pop() || '';
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
  };

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      onToggleSidebar();
    }
  }, [location.pathname, isMobile, isOpen, onToggleSidebar]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggleSidebar}
          aria-hidden="true"
        />
      )}
      
      <Sidebar 
        isOpen={isOpen} 
        isCollapsed={isCollapsed} 
        onToggle={onToggleSidebar} 
        onToggleCollapse={onToggleCollapse} 
      />
      
      {/* Main content area */}
      <div 
        className={classNames(
          'flex-1 flex flex-col overflow-y-auto transition-all duration-200 ease-in-out',
          'transform',
          isOpen && isMobile ? 'translate-x-64' : 'translate-x-0',
          'md:translate-x-0', // Reset transform on desktop
          'pb-16 md:pb-0'
        )}
        style={{
          marginLeft: !isMobile && !isCollapsed ? '16rem' : '5rem', // Match the sidebar width
          transition: 'margin 200ms ease-in-out',
        }}
      >
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              {isMobile && (
                <button
                  type="button"
                  className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={onToggleSidebar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-2xl font-semibold text-gray-900">
                {getPageTitle()}
              </h1>
              <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="relative">
                  <button className="flex items-center text-sm rounded-full focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <span className="text-sm font-medium">AD</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><Spinner /></div>}>
              {children || (
                isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Spinner />
                  </div>
                ) : (
                  <Outlet />
                )
              )}
            </Suspense>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={onToggleSidebar}
              className="flex flex-col items-center justify-center text-gray-600 hover:text-indigo-600 flex-1"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-xs mt-1">Menu</span>
            </button>
            
            {navigation.slice(0, 3).map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`flex flex-col items-center justify-center flex-1 ${
                  location.pathname === item.href ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
