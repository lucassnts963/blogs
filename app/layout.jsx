// app/layout.jsx
import Image from "next/image";
import "./global.css";
import Link from "next/link";
import { formatDate } from "lib/utils";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { MobileMenu } from "components/MobileMenu";
import { MobileSearch } from "components/MobileSearch";
import { UserSection } from "components/UserSection";

export const metadata = {
  title: "Jornal o Nordeste Paraense",
  description:
    "Jornal o Nordeste Paraense - Portal de notícias completo com as últimas atualizações.",
};

const categories = [
  "Cidades",
  "Política",
  "Brasil",
  "Economia",
  "Mundo",
  "Diversão e Arte",
  "Ciência e Saúde",
  "Eu Estudante",
  "Concursos",
  "Direitos e Justiça",
  "Publicidade Legal",
  "Classificados",
  "Polícia",
];

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900">
        {/* HEADER */}
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

                <UserSection />

                {/* Font Size Controls */}
                {/* <div className="hidden md:flex items-center gap-2 px-2 border-l border-orange-600">
                  <button className="text-white text-sm hover:text-orange-200">
                    A+
                  </button>
                  <button className="text-white text-sm hover:text-orange-200">
                    A-
                  </button>
                </div> */}

                {/* Social Media */}
                <div className="flex items-center gap-3 px-2 border-l border-orange-600">
                  <a
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
                  </a>
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
                <li key={category}>
                  <Link
                    href={`/categorias/${category}`}
                    className="hover:text-orange-200 transition-colors whitespace-nowrap"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
                <p className="text-gray-300 text-sm">
                  O Jornal o Nordeste Paraense é o seu portal de notícias
                  completo, trazendo as últimas atualizações da região.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/sobre"
                      className="text-gray-300 hover:text-white"
                    >
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contato"
                      className="text-gray-300 hover:text-white"
                    >
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacidade"
                      className="text-gray-300 hover:text-white"
                    >
                      Política de Privacidade
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contato</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Email: contato@nordesteparaense.com.br</p>
                  <p>Telefone: (91) 9999-9999</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} Jornal o Nordeste Paraense -
                Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
