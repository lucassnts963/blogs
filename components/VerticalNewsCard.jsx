import Link from "next/link";

export function VerticalNewsCard({ title, category, image, link }) {
  return (
    <Link href={link} className="group">
      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-500 group-hover:scale-110">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
          {/* Category */}
          <span className="bg-orange-600 text-xs uppercase font-bold px-2 py-1 rounded">
            {category}
          </span>

          {/* Title */}
          <h2 className="mt-2 text-lg font-semibold leading-tight">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
