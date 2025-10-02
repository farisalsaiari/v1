import { useState, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from "./components/Layout/Layout";
import { Spinner } from "./components/ui/Spinner";

// Lazy load pages with proper handling for both named and default exports
const lazyLoad = (path: string) => 
  lazy(() => import(`./pages/${path}.tsx`).then(module => ({ 
    default: module.default || module[path.split('/').pop() || ''] 
  })));

const Dashboard = lazyLoad('Dashboard');
const Orders = lazyLoad('Orders');
const Products = lazyLoad('Products');
const Customers = lazyLoad('Customers');
const Analytics = lazyLoad('Analytics');
const Reports = lazyLoad('Reports');
const Settings = lazyLoad('Settings');

type LayoutProps = {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
  children: React.ReactNode;
};

export function App() {
  // Check if the screen is mobile on initial render
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768; // true for desktop, false for mobile
    }
    return false; // default to false for SSR
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  // Check if current route is an auth page (login, signup, etc.)
  const isAuthPage = ['/login', '/signup', '/forgot-password'].some(path => 
    location.pathname.startsWith(path)
  );

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/signup" element={<div>Signup Page</div>} />
        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Layout
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
        onToggleCollapse={toggleCollapse}
      >
        <Suspense fallback={<div className="flex items-center justify-center h-64"><Spinner /></div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}