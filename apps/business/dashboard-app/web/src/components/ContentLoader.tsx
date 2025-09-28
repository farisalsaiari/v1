import { useNetworkStatus } from '../contexts/NetworkStatusContext';

// components/ContentLoader.tsx
export function ContentLoader() {
  const { isSlowConnection, rtt } = useNetworkStatus();

  if (isSlowConnection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-300 border-b-blue-100 border-l-blue-300 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
        </div>
        <h3 className="text-lg font-medium text-gray-700">Loading content...</h3>
        <p className="mt-2 text-sm text-gray-500">
          Your connection seems slow ({rtt}ms). Please wait while we load the content.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header skeleton */}
      <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>

      {/* Content skeleton rows */}
      <div className="space-y-2 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-6 bg-gray-200 rounded w-full animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

