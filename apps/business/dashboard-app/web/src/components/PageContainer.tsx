import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  title,
  subtitle,
  actions,
  className = '',
}: PageContainerProps) {
  const location = useLocation();
  const pageTitle = title || location.pathname.slice(1) || 'Dashboard';
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).replace(/-/g, ' ');

  return (
    <div className={`flex-1 flex flex-col h-full overflow-auto ${className}`}>
      {/* Page Header */}
      <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {formattedTitle}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
          
          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
