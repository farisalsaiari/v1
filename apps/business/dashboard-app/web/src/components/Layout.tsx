import { Outlet, useLocation, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer";
import { Suspense, useEffect, useRef, useState } from "react";
import { pageLoaders } from "./loaders/PageLoader";
import { CardLoader } from "./loaders/CardLoader";
import { SidebarProps } from "./Sidebar/types";
import { SpinnerLoader } from "./loaders/SpinnerLoader";
import SlidePageModal from "./SlidePageModal";

export function Layout({
  isOpen: sidebarOpen = false,
  isCollapsed = false,
  onToggleSidebar = () => {},
  onToggleCollapse = () => {},
}: SidebarProps) {
  const location = useLocation();
  const pageName = location.pathname.slice(1) || "dashboard";

  const hasLoadedOnce = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlidePageModalOpen, setSlidePageModalOpen] = useState(false);
  
  // Handle modal state for the sidebar
  const [modalState, setModalState] = useState(false);
  
  // Close the slide page modal when the sidebar is toggled
  useEffect(() => {
    if (sidebarOpen) {
      setSlidePageModalOpen(false);
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (!hasLoadedOnce.current) {
      hasLoadedOnce.current = true;
    }

    // Simulate network load for demonstration (replace with real logic)
    const timer = setTimeout(() => setIsLoading(false), 800);

    return () => clearTimeout(timer);
  }, [location]);

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/orders":
        return { title: "Orders", subtitle: "Manage your customer orders" };
      case "/menu":
        return { title: "Menu", subtitle: "Update your menu items" };
      case "/settings":
        return { title: "Settings", subtitle: "Manage your account and preferences" };
      default:
        return { title: "Dashboard", subtitle: "Overview of your business" };
    }
  };

  const pageInfo = getPageInfo();

  if (isLoading) return <SpinnerLoader />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with independent scrolling */}
      <div className="h-screen overflow-y-auto sticky top-0">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
          onToggleCollapse={onToggleCollapse}
          setModalState={setModalState}
        />
      </div>
      
      {isSlidePageModalOpen && (
        <SlidePageModal
          isOpen={isSlidePageModalOpen}
          onClose={() => setSlidePageModalOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 bg-gray-50 pb-[60px] lg:pb-0 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white min-h-full">
            <div className={`w-full transition-opacity duration-500 ${!hasLoadedOnce.current ? "opacity-0 animate-fade-slide" : "opacity-100"}`}>
              <Suspense fallback={<SpinnerLoader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </main>
        <div className="border-solid border-gray-200">
          <Footer />
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 flex items-center justify-between px-4 py-2 z-[9999] lg:hidden" style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}>
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
        {/* Right: Desktop Buttons */}
        <div className="flex items-center gap-2">
          {/* Notification */}
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-black">
              <path d="M18 17V11C18 8.39 16.33 6.18 14 5.35V5C14 3.9 13.1 3 12 3C10.9 3 10 3.9 10 5V5.35C7.67 6.18 6 8.39 6 11V17H4V19H10C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19H20V17H18ZM8 17V11C8 8.79 9.79 7 12 7C14.21 7 16 8.79 16 11V17H8Z" />
            </svg>
            <span className="absolute top-[2px] right-[5px] w-2 h-2 rounded-full bg-blue-500"></span>
          </button>
          {/* Search */}
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors relative p-1">
            <svg className='mt-' width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    </div>
  );
}
