import { MobileMenu } from "components/MobileMenu";
import { MobileSearch } from "components/MobileSearch";
import { formatDate } from "lib/utils";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header({ categories, blogId }) {
  return (
    <header className="bg-orange-700 text-white">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Welcome Message */}
          <p className="text-sm text-center md:text-left">
            Seja Bem-vindo, São Miguel do Guamá,{" "}
            {formatDate(new Date().toISOString())}
          </p>

          {/* Top Actions */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/anuncie"
              className="bg-white text-orange-700 px-3 py-1 rounded text-sm hover:bg-orange-50 transition-colors"
            >
              Anuncie
            </Link>

            {/* Social Media */}
            <div className="flex items-center gap-3 px-2 border-l border-orange-600">
              {/* <a
                href="#"
                aria-label="Facebook"
                className="hover:text-orange-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-orange-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-orange-200"
              >
                <Instagram size={20} />
              </a> */}
            </div>

            {/* Mobile Search */}
            <MobileSearch />

            {/* Desktop Search */}
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-white text-gray-900 px-4 py-1 rounded text-sm w-48 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo Area */}
      <div className="bg-orange-900 relative h-24 md:h-[200px]">
        <Image
          src="/logo.jpg"
          alt="logo do site contendo o titulo em branco, o nordeste paraense"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="bg-orange-600 relative">
        {/* Mobile Menu */}
        <MobileMenu categories={categories} />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center items-center flex-wrap gap-x-6 gap-y-2 p-4 text-sm">
          {categories.map((category) => (
            <li key={category.uuid}>
              <Link
                href={`/categorias?category=${category.description}`}
                className="hover:text-orange-200 transition-colors whitespace-nowrap"
              >
                {category.description}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
