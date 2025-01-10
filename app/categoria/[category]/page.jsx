// app/categoria/[category]/page.js
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { category } = params; // Acessa o parâmetro de categoria na URL

  // Aqui você pode simular a recuperação das notícias da categoria e as últimas 5 notícias gerais
  // Este exemplo usa dados fictícios, mas você pode integrá-los a uma API ou banco de dados real
  const categoryNews = [
    {
      title: "Notícia 1 da categoria",
      description: "Descrição da notícia",
      image: "/path/to/image1.jpg",
    },
    {
      title: "Notícia 2 da categoria",
      description: "Descrição da notícia",
      image: "/path/to/image2.jpg",
    },
    {
      title: "Notícia 3 da categoria",
      description: "Descrição da notícia",
      image: "/path/to/image3.jpg",
    },
    {
      title: "Notícia 4 da categoria",
      description: "Descrição da notícia",
      image: "/path/to/image4.jpg",
    },
  ];

  const generalNews = [
    {
      title: "Última notícia 1",
      description: "Descrição da última notícia",
      link: "/noticia/1",
    },
    {
      title: "Última notícia 2",
      description: "Descrição da última notícia",
      link: "/noticia/2",
    },
    {
      title: "Última notícia 3",
      description: "Descrição da última notícia",
      link: "/noticia/3",
    },
    {
      title: "Última notícia 4",
      description: "Descrição da última notícia",
      link: "/noticia/4",
    },
    {
      title: "Última notícia 5",
      description: "Descrição da última notícia",
      link: "/noticia/5",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* PUBLICIDADE */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Publicidade</h2>
        <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
          <p>Espaço para banners publicitários</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="text-gray-500 mb-4">
        <Link href="/" className="text-orange-500">
          Home
        </Link>{" "}
        &gt;
        <Link href="/" className="text-orange-500">
          {" "}
          Notícias
        </Link>{" "}
        &gt;
        <span className="font-semibold">{decodeURI(category)}</span>
      </div>

      {/* Título da categoria */}
      <h1 className="text-3xl font-bold mb-6">{decodeURI(category)}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de Notícias da Categoria */}
        <div className="col-span-2 space-y-6">
          {categoryNews.map((news, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
              <p className="text-gray-600">{news.description}</p>
            </div>
          ))}
        </div>

        {/* Últimas 5 Notícias Gerais */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Últimas Notícias Gerais</h2>
          {generalNews.map((news, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="font-semibold text-lg">{news.title}</h3>
              <p className="text-gray-600">{news.description}</p>
              <Link
                href={news.link}
                className="text-orange-500 mt-2 inline-block"
              >
                Ler mais
              </Link>
            </div>
          ))}
          <div className="text-center mt-4">
            <Link href="/noticias" className="text-orange-500 font-semibold">
              Ver mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
