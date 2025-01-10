import Image from "next/image";
import "./global.css";
import Link from "next/link";

export const metadata = {
  title: "Jornal o Nordeste Paraense",
  description:
    "Jornal o Nordeste Paraense - Portal de notícias completo com as últimas atualizações.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900">
        {/* HEADER */}
        <header className="bg-orange-700 text-white">
          <div className="container mx-auto p-2 flex justify-between items-center">
            <div>
              <p>Seja Bem-vindo, São Miguel do Guamá, 07/12/2024</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white text-orange-700 px-3 py-1 rounded">
                Anuncie
              </button>
              <Link
                href="/autenticacao/login"
                className="bg-white text-orange-700 px-3 py-1 rounded"
              >
                Login
              </Link>
              <div className="flex space-x-2">
                <button className="text-white text-lg">A+</button>
                <button className="text-white text-lg">A-</button>
              </div>
              <div className="flex space-x-3">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-white px-4 py-1 rounded"
              />
            </div>
          </div>
          <div className="bg-orange-900 py-3 text-center h-[200px] relative">
            <Image
              src="/logo.jpg"
              alt="logo do site contendo o titulo em branco, o nordeste paraense"
              fill
              className="object-fill"
            />
          </div>
          <nav className="bg-orange-600">
            <ul className="flex justify-center space-x-4 p-2 text-white">
              {[
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
              ].map((category) => (
                <li key={category}>
                  <Link
                    href={`/categoria/${category}`}
                    className="hover:underline"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* MAIN CONTENT */}

        <div className="relative">{children}</div>

        {/* FOOTER */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>
              &copy; 2024 Portal de Notícias - Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
