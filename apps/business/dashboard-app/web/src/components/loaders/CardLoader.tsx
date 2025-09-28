// CardLoader.tsx
export function CardLoader() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-4 max-w-lg mx-auto"
        >
          <div className="h-6 rounded shimmer animate-shimmer w-3/4 mb-4"></div>
          <div className="h-4 rounded shimmer animate-shimmer w-full mb-2"></div>
          <div className="h-4 rounded shimmer animate-shimmer w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
