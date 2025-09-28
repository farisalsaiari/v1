import React from 'react';
import { useLocation } from 'react-router-dom';
import { sidebarData, SidebarItem } from '../data/sidebarData';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

const Breadcrumb: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const findBreadcrumbPath = (items: SidebarItem[], targetPath: string, parentPath: BreadcrumbItem[] = []): BreadcrumbItem[] | null => {
        for (const item of items) {
            const currentBreadcrumb = [...parentPath, { label: item.label, path: item.path }];

            // Check if this item matches the current path
            if (item.path === targetPath) {
                return currentBreadcrumb;
            }

            // Search in children
            if (item.children) {
                const childResult = findBreadcrumbPath(item.children, targetPath, currentBreadcrumb);
                if (childResult) {
                    return childResult;
                }
            }
        }
        return null;
    };

    const breadcrumbPath = findBreadcrumbPath(sidebarData, currentPath);

    // Don't show breadcrumb for root pages or if path not found
    if (!breadcrumbPath || breadcrumbPath.length <= 1) {
        return null;
    }

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-5">
            <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbPath.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        )}
                        <span
                            className={`${index === breadcrumbPath.length - 1
                                    ? 'text-gray-900 font-semibold'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {item.label}
                        </span>
                    </React.Fragment>
                ))}
            </nav>
        </div>
    );
};

export default Breadcrumb;
