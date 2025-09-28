// TableLoader.tsx
export function TableLoader() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {[...Array(5)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-4 rounded shimmer animate-shimmer w-20"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i}>
              {[...Array(5)].map((_, j) => (
                <td key={j} className="px-6 py-4">
                  <div className="h-4 rounded shimmer animate-shimmer w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
