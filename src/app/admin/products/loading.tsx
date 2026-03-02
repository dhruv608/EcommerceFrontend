export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      
      {/* Top Filters */}
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-64 bg-gray-200 rounded"></div>
        <div className="h-10 w-40 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
        <div className="ml-auto h-10 w-36 bg-gray-200 rounded"></div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8 gap-4 py-3 border-b">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Table Rows */}
      {Array(8).fill(0).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-8 gap-4 items-center py-4 border-b"
        >
          {/* Product */}
          <div className="flex gap-3 col-span-2">
            <div className="h-12 w-12 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Category */}
          <div className="h-4 w-20 bg-gray-200 rounded"></div>

          {/* Price */}
          <div className="h-4 w-14 bg-gray-200 rounded"></div>

          {/* Stock */}
          <div className="h-4 w-10 bg-gray-200 rounded"></div>

          {/* Gallery */}
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>

          {/* Featured */}
          <div className="h-5 w-10 bg-gray-200 rounded-full"></div>

          {/* Active */}
          <div className="h-5 w-10 bg-gray-200 rounded-full"></div>

          {/* Actions */}
          <div className="flex gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
