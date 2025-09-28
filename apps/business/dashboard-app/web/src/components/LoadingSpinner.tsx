import React, { useEffect, useState } from 'react';

const LoadingSpinner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      role="status"
      aria-live="polite"
      aria-busy={true}
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-transparent border-r-gray-700 border-b-transparent border-l-transparent rounded-full animate-spin"
          style={{
            animationDuration: '0.8s',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderColor: 'transparent #374151 transparent transparent'
          }}>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
