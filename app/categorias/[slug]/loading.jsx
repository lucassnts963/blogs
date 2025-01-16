// app/categoria/[slug]/loading.jsx
export default function LoadingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-2 h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Featured Section Skeleton */}
      <div className="mb-12">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="h-[400px] md:h-[500px] bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="grid grid-cols-1 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[200px] bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Skeleton */}
      <div className="mb-12">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[200px] bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
