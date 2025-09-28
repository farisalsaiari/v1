// src/components/loaders/SpinnerLoader.tsx
export function SpinnerLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <svg
        className="animate-spin h-12 w-12 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90"
          strokeDashoffset="10"
        />
      </svg>
    </div>
  );
}
