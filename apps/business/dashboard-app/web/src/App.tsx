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
const Banking = lazy(() => import("./pages/Banking"));
const Staff = lazy(() => import("./pages/Staff"));
const Online = lazy(() => import("./pages/Online"));
const Customers = lazy(() => import("./pages/Customers"));

// Items
const Menus = lazy(() => import("./pages/Menus"));
const MenuDetails = lazy(() => import('./pages/items/menus/[id]'));
const Users = lazy(() => import("./pages/Users"));
const ItemLibrary = lazy(() => import("./pages/ItemLibrary"));
const ChannelListing = lazy(() => import("./pages/items/channels"));
const ServiceLibrary = lazy(() => import("./pages/items/services"));
const ImageLibrary = lazy(() => import("./pages/items/images"));
const Modifiers = lazy(() => import("./pages/items/modifiers"));
const Categories = lazy(() => import("./pages/items/categories"));
const Units = lazy(() => import("./pages/items/units"));
const Discounts = lazy(() => import("./pages/items/discounts"));
const Options = lazy(() => import("./pages/items/options"));
const CustomAttributes = lazy(() => import("./pages/items/attributes"));
const Inventory = lazy(() => import("./pages/items/inventory"));
const GiftCards = lazy(() => import("./pages/items/gift-cards"));
const ItemSubscriptions = lazy(() => import("./pages/items/subscriptions"));
const ItemSettings = lazy(() => import("./pages/items/settings"));

// Settings
const LocationsPage = lazy(() => import("./pages/settings/business/LocationsPage"));
const BusinessProfile = lazy(() => import("./pages/settings/business/BusinessProfile"));
const Security = lazy(() => import("./pages/settings/business/Security"));
const Taxes = lazy(() => import("./pages/settings/business/Taxes"));
const PaymentsSettings = lazy(() => import("./pages/settings/business/Payments"));
const Notifications = lazy(() => import("./pages/settings/business/Notifications"));
const Integrations = lazy(() => import("./pages/settings/business/Integrations"));
const About = lazy(() => import("./pages/settings/business/About"));
const Tickets = lazy(() => import("./pages/settings/Tickets"));
const Pricing = lazy(() => import("./pages/settings/account/Pricing"));

// Reports
const Reports = lazy(() => import("./pages/reports"));
const SalesReport = lazy(() => import("./pages/reports/SalesReport"));
const CustomerReport = lazy(() => import("./pages/reports/CustomerReport"));
const InventoryReport = lazy(() => import("./pages/reports/InventoryReport"));

// Payments
const Transactions = lazy(() => import("./pages/payments/transactions"));
const RiskManager = lazy(() => import("./pages/payments/risk-manager"));
const Subscriptions = lazy(() => import("./pages/payments/subscriptions"));
const Disputes = lazy(() => import("./pages/payments/disputes"));
const VirtualTerminalOverview = lazy(() => import("./pages/payments/virtual-terminal/overview"));
const VirtualTerminalSettings = lazy(() => import("./pages/payments/virtual-terminal/settings"));

// Invoices
const InvoicesOverview = lazy(() => import("./pages/payments/invoices/overview"));
const InvoicesProjects = lazy(() => import("./pages/payments/invoices/projects"));
const InvoicesList = lazy(() => import("./pages/payments/invoices/invoices"));
const RecurringSeries = lazy(() => import("./pages/payments/invoices/recurring-series"));
const Estimates = lazy(() => import("./pages/payments/invoices/estimates"));
const InvoiceReports = lazy(() => import("./pages/payments/invoices/reports"));
const InvoiceApps = lazy(() => import("./pages/payments/invoices/apps"));

// Orders
const OrdersList = lazy(() => import("./pages/payments/orders"));
const OrderPartners = lazy(() => import("./pages/payments/orders/partners"));
const FulfilmentSettings = lazy(() => import("./pages/payments/orders/fulfilment-settings"));
const InstantPayouts = lazy(() => import("./pages/payments/orders/instant-payouts"));
const Deliveries = lazy(() => import("./pages/payments/orders/deliveries"));

// Item Settings
const ItemDefaults = lazy(() => import("./pages/items/settings/item-defaults"));
const DiningOptions = lazy(() => import("./pages/items/settings/dining-options"));

export function App() {
  const location = useLocation();

  // Initialize sidebar as closed by default, especially for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
              onToggleCollapse={toggleCollapse} />
          }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />

          {/* Orders */}
          <Route path="/orders" element={<Orders />} />
          
          {/* Main Sections */}
          <Route path="/banking" element={<Banking />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/online" element={<Online />} />
          <Route path="/customers" element={<Customers />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/business/profile" element={<BusinessProfile />} />
          <Route path="/settings/business/locations" element={<LocationsPage />} />
          <Route path="/settings/business/security" element={<Security />} />
          <Route path="/settings/business/taxes" element={<Taxes />} />
          <Route path="/settings/business/payments" element={<PaymentsSettings />} />
          <Route path="/settings/business/notifications" element={<Notifications />} />
          <Route path="/settings/business/integrations" element={<Integrations />} />
          <Route path="/settings/business/about" element={<About />} />
          <Route path="/settings/account/pricing" element={<Pricing />} />
          <Route path="/settings/tickets" element={<Tickets />} />
          
          {/* Items */}
          <Route path="/items/library" element={<ItemLibrary />} />
          <Route path="/items/channels" element={<ChannelListing />} />
          <Route path="/items/services" element={<ServiceLibrary />} />
          <Route path="/items/images" element={<ImageLibrary />} />
          <Route path="/items/modifiers" element={<Modifiers />} />
          <Route path="/items/categories" element={<Categories />} />
          <Route path="/items/units" element={<Units />} />
          <Route path="/items/discounts" element={<Discounts />} />
          <Route path="/items/options" element={<Options />} />
          <Route path="/items/attributes" element={<CustomAttributes />} />
          <Route path="/items/menus" element={<Menus />} />
          <Route path="/items/menus/:id" element={<MenuDetails />} />
          <Route path="/items/inventory" element={<Inventory />} />
          <Route path="/items/gift-cards" element={<GiftCards />} />
          <Route path="/items/subscriptions" element={<ItemSubscriptions />} />
          
          {/* Item Settings */}
          <Route path="/items/settings" element={<ItemSettings />} />
          <Route path="/items/settings/item-defaults" element={<ItemDefaults />} />
          <Route path="/items/settings/dining-options" element={<DiningOptions />} />
          
          {/* Reports */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/sales" element={<SalesReport />} />
          <Route path="/reports/customers" element={<CustomerReport />} />
          <Route path="/reports/inventory" element={<InventoryReport />} />
          
          {/* Payments */}
          <Route path="/payments/transactions" element={<Transactions />} />
          <Route path="/payments/risk-manager" element={<RiskManager />} />
          <Route path="/payments/subscriptions" element={<Subscriptions />} />
          <Route path="/payments/disputes" element={<Disputes />} />
          
          {/* Virtual Terminal */}
          <Route path="/payments/virtual-terminal/overview" element={<VirtualTerminalOverview />} />
          <Route path="/payments/virtual-terminal/settings" element={<VirtualTerminalSettings />} />
          
          {/* Invoices */}
          <Route path="/payments/invoices/overview" element={<InvoicesOverview />} />
          <Route path="/payments/invoices/projects" element={<InvoicesProjects />} />
          <Route path="/payments/invoices/invoices" element={<InvoicesList />} />
          <Route path="/payments/invoices/recurring-series" element={<RecurringSeries />} />
          <Route path="/payments/invoices/estimates" element={<Estimates />} />
          <Route path="/payments/invoices/reports" element={<InvoiceReports />} />
          <Route path="/payments/invoices/apps" element={<InvoiceApps />} />
          
          {/* Orders */}
          <Route path="/payments/orders" element={<OrdersList />} />
          <Route path="/payments/orders/deliveries" element={<Deliveries />} />
          <Route path="/payments/orders/partners" element={<OrderPartners />} />
          <Route path="/payments/orders/fulfilment-settings" element={<FulfilmentSettings />} />
          <Route path="/payments/orders/instant-payouts" element={<InstantPayouts />} />
          
          {/* Users */}
          <Route path="/users" element={<Users />} />

        </Route>

        {/* Show 404 for any unknown routes - without any layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
