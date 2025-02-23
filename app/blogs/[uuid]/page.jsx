import { HorizontalNewsCard, NewsCard } from "components/NewsCard";
import { Slide } from "components/Slide";
import Post from "models/post";
import Category from "models/category";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";

async function getNews(blogId) {
  try {
    const posts = await Post.findAll({ blogId });
    return posts || [];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

async function getCategorias(blogId) {
  try {
    const categories = await Category.findAll({ blogId });
    return categories || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export const metadata = {
  title: "Jornal o Nordeste Paraense",
  description:
    "Jornal o Nordeste Paraense - Portal de notícias completo com as últimas atualizações.",
};

export default async function BlogHomePage({ params }) {
  const blogId = params.uuid;
  const [news, categories] = await Promise.all([
    getNews(blogId),
    getCategorias(blogId),
  ]);

  return (
    <>
      <Header categories={categories} blogId={blogId} />
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Publicidade</h2>
          <div className="bg-gray-200 h-32 md:h-40 flex items-center justify-center rounded-lg shadow-md">
            <p className="text-gray-600">Espaço para banners publicitários</p>
          </div>
        </section>

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

        <div className="grid grid-cols-1 gap-12">
          {categories.map((category) => (
            <section key={category.uuid}>
              <h2 className="text-2xl font-bold mb-6">
                {category.description}
              </h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <Slide
                      slides={news
                        .filter(
                          (item) =>
                            item.category?.description.toLowerCase() ===
                            category.description.toLowerCase()
                        )
                        .slice(0, 3)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  {buildNewsByCategory(news, category, blogId)}
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
  if (!news.length) {
    return (
      <p className="text-gray-500 text-center p-4">
        Nenhum destaque disponível no momento.
      </p>
    );
  }
  return news
    .slice(1, 3) // Mantém a lógica do slice, mas já garantimos que há notícias
    .map((item) => (
      <NewsCard
        key={item.uuid}
        blogId={blogId}
        title={item.title}
        category={item.category.description}
        image={item.imageUrl}
        slug={item.slug}
      />
    ));
}

function buildNewsByCategory(news, category, blogId) {
  const filteredNews = news.filter(
    (item) =>
      item.category?.description.toLowerCase() ===
      category.description.toLowerCase()
  );

  if (!filteredNews.length) {
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
          key={item.uuid} // Altere de item.id para item.uuid para garantir unicidade
          title={item.title}
          category={item.category.description}
          image={item.imageUrl}
          slug={`/blogs/${blogId}/post/${item.slug}`}
        />
      ))}
    </div>
  );
}
