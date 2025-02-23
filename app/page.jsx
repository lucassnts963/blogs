import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Layout } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold">BlogService</div>
            <div className="flex gap-4">
              <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
                Blogs
              </Link>
              <Link
                href="/autenticacao/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Seu espaço para compartilhar ideias
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Crie, compartilhe e conecte-se com leitores através do seu próprio
              blog personalizado.
            </p>
            <div className="mt-5 max-w-md mx-auto flex justify-center">
              <Link
                href="/autenticacao/cadastro"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-medium">
                  Publique com facilidade
                </h3>
              </div>
              <p className="mt-4 text-gray-500">
                Editor intuitivo que permite criar e publicar conteúdo
                rapidamente
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Layout className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-medium">
                  Design personalizável <strong>(em breve)</strong>
                </h3>
              </div>
              <p className="mt-4 text-gray-500">
                Personalize o layout do seu blog para refletir seu estilo único
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-medium">
                  Construa sua audiência
                </h3>
              </div>
              <p className="mt-4 text-gray-500">
                Ferramentas para crescer e engajar com sua comunidade de
                leitores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
