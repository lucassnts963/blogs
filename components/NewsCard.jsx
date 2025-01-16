// NewsCard.jsx
import Link from "next/link";

export function NewsCard({ title, category, image, slug }) {
  return (
    <Link href={`/posts/${slug}`} className="group block h-full">
      <div className="relative h-[200px] md:h-[250px] overflow-hidden rounded-lg shadow-lg">
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-500 group-hover:scale-110">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block bg-orange-600 text-white text-xs uppercase font-bold px-2 py-1 rounded mb-2">
            {category}
          </span>
          <h2 className="text-white text-lg font-semibold line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

// HorizontalNewsCard.jsx
export function HorizontalNewsCard({ title, category, image, slug }) {
  return (
    <Link
      href={slug}
      className="group flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-500 group-hover:scale-110">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-1 p-4">
        <span className="inline-block bg-orange-600 text-white text-sm uppercase font-bold px-2 py-1 rounded mb-2">
          {category}
        </span>
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-3">
          {title}
        </h2>
      </div>
    </Link>
  );
}
