import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-300 text-sm">
              O Jornal o Nordeste Paraense é o seu portal de notícias completo,
              trazendo as últimas atualizações da região.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white">
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
              <p>Email: onordesteparaense@gmail.com</p>
              <p>Telefone: (91) 98326-5265</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Jornal o Nordeste Paraense - Todos
            os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
