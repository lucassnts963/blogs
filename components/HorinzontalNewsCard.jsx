import Link from "next/link";

export function HorizontalNewsCard({ title, category, image, link }) {
  return (
    <Link
      href={link}
      className="group flex flex-col md:flex-row items-stretch gap-4"
    >
      {/* Imagem à esquerda */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-lg shadow-lg flex-shrink-0">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-500 group-hover:scale-110">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Informações à direita */}
      <div className="flex-1 flex flex-col justify-start p-4 bg-white rounded-lg shadow-lg">
        {/* Categoria */}
        <span className="bg-orange-600 text-lg uppercase font-bold px-2 py-1 rounded self-start">
          {category}
        </span>

        {/* Título */}
        <h2 className="mt-2 text-2xl font-semibold leading-tight">{title}</h2>
      </div>
    </Link>
  );
}

export default HorizontalNewsCard;
