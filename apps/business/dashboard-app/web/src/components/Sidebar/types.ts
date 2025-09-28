export interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
  onNotificationClick?: () => void
    onSupportClick?: () => void
    onSettingsClick?: () => void
}


export interface SidebarItem {
    id: string;
    label: string;
    icon?: string;
    path?: string;
    children?: SidebarItem[];
}