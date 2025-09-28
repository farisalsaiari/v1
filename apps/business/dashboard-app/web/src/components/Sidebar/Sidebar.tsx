import { NavLink } from "react-router-dom";
import { SidebarProps } from "./types";

export function Sidebar({
  isOpen,
  isCollapsed,
  onToggleSidebar,
  onToggleCollapse,
}: SidebarProps) {
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
