import { HorizontalNewsCard, NewsCard } from "components/NewsCard";
import { Slide } from "components/Slide";
import { extractFirstImagefromMarkdown } from "lib/utils";
import Post from "models/post";
import { notFound } from "next/navigation";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";

async function getNews(blogId) {
  try {
    const posts = await Post.findAll({
      blogId,
    });

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export const metadata = {
  title: "Jornal o Nordeste Paraense",
  description:
    "Jornal o Nordeste Paraense - Portal de notícias completo com as últimas atualizações.",
};

// HomePage.jsx
export default async function HomePage({ params }) {
  const blogId = params.uuid;
  const news = await getNews(blogId);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* PUBLICIDADE */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Publicidade</h2>
          <div className="bg-gray-200 h-32 md:h-40 flex items-center justify-center rounded-lg shadow-md">
            <p className="text-gray-600">Espaço para banners publicitários</p>
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Destaques</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <div className="h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                <Slide slides={news.slice(0, 3)} />
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="flex flex-col gap-6">
                {buildDestaques(news, blogId)}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <div className="grid grid-cols-1 gap-12">
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
            <section key={category}>
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <Slide
                      slides={news
                        .filter((item) => item.category === category)
                        .slice(0, 3)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  {buildNewsByCategory(news, category)}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

function buildDestaques(news, blogId) {
  if (!news?.length) {
    return (
      <p className="text-gray-500 text-center p-4">
        Nenhum destaque disponível no momento.
      </p>
    );
  }

  return news
    .slice(1, 3)
    .map((item) => (
      <NewsCard
        key={item.uuid}
        blogId={blogId}
        title={item.title}
        category={item.category}
        image={item.imageUrl}
        slug={item.slug}
      />
    ));
}

function buildNewsByCategory(news, category) {
  const filteredNews = news.filter((item) => item.category === category);

  if (!filteredNews?.length) {
    return (
      <p className="text-gray-500 text-center p-4">
        Nenhuma notícia disponível nesta categoria.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {filteredNews.slice(0, 3).map((item) => (
        <HorizontalNewsCard
          key={item.id}
          title={item.title}
          category={item.category}
          image={item.imageUrl}
          slug={`/${blogId}/post/${item.slug}`}
        />
      ))}
    </div>
  );
}
