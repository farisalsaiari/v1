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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        onToggleSidebar={onToggleSidebar}
        onToggleCollapse={onToggleCollapse}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900">{pageInfo.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{pageInfo.subtitle}</p>
            </div>

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
