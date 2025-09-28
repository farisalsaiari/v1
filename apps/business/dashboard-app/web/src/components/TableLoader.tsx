export function TableLoader() {
  return (
    <div className="p-6 space-y-4">
      {/* Table header skeleton */}
      <div className="flex space-x-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-6 bg-gray-300 rounded w-1/5 shimmer"
          ></div>
        ))}
      </div>

      {/* Table rows skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {Array.from({ length: 5 }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-5 bg-gray-300 rounded w-1/5 shimmer"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
