// Sidebar/types.ts
export interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
}
