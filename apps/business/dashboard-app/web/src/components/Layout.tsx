import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer";
import { Suspense, useEffect, useRef, useState } from "react";
import { pageLoaders } from "./loaders/PageLoader";
import { CardLoader } from "./loaders/CardLoader";
import { SidebarProps } from "./Sidebar/types";
import { SpinnerLoader } from "./loaders/SpinnerLoader";

export function Layout({
  isOpen,
  isCollapsed,
  onToggleSidebar,
  onToggleCollapse,
}: SidebarProps) {
  const location = useLocation();
  const pageName = location.pathname.slice(1) || "dashboard";

  const hasLoadedOnce = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div 
        className={`fixed left-0 top-0 bottom-0 z-10 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-[68px]' : 'w-[280px]'
        }`}
      >
        <Sidebar
          isOpen={isOpen}
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
          onToggleCollapse={onToggleCollapse}
        />
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isOpen 
            ? (isCollapsed ? 'lg:ml-[68px]' : 'lg:ml-[280px]') 
            : 'lg:ml-0'
        }`}
      >
        <main className="flex-grow overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            {/* Page Header */}
            {/* <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900">{pageInfo.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{pageInfo.subtitle}</p>
            </div> */}

            <div className={`transition-opacity duration-500 ${!hasLoadedOnce.current ? "opacity-0 animate-fade-slide" : "opacity-100"}`}>
              <Suspense fallback={pageLoaders[pageName] || <CardLoader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
