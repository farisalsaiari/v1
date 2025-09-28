import { Suspense, lazy, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SpinnerLoader } from "./components/loaders/SpinnerLoader";

// Lazy-loaded pages
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const Verify = lazy(() => import("./pages/auth/Verify"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Menu = lazy(() => import("./pages/Menu"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const Help = lazy(() => import("./pages/Help"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function App() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleCollapse = () => setSidebarCollapsed(prev => !prev);

  const isAuthPage = ["/signup", "/login", "/verify", "/test"].some(path => location.pathname.startsWith(path));

  return (
    <Suspense fallback={<SpinnerLoader />}>
      <Routes>
        {/* Public routes without layout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        
        {/* Main app routes with layout */}
        <Route
          element={
            <Layout
              isOpen={sidebarOpen}
              isCollapsed={sidebarCollapsed}
              onToggleSidebar={toggleSidebar}
              onToggleCollapse={toggleCollapse}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<Menu />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>
        
        {/* Show 404 for any unknown routes - without any layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
