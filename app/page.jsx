import { HorizontalNewsCard, NewsCard } from "components/NewsCard";
import { Slide } from "components/Slide";
import { extractFirstImagefromMarkdown } from "lib/utils";
import Post from "models/post";
import { notFound } from "next/navigation";

async function getNews() {
  try {
    const posts = await Post.findAll({
      blogId: "7848c6a6-ee92-40c6-950e-2700418dba6d",
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

// HomePage.jsx
export default async function HomePage() {
  const news = await getNews();

  return (
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
            <div className="flex flex-col gap-6">{buildDestaques(news)}</div>
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
  );
}

function buildDestaques(news) {
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
        key={item.id}
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
          slug={`/post/${item.slug}`}
        />
      ))}
    </div>
  );
}
