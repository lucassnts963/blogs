import Link from "next/link";
import Category from "models/category";
import Post from "models/post";
import { Header } from "app/blogs/_components/Header";
import { Footer } from "app/blogs/_components/Footer";
import { AdSlide } from "app/blogs/_components/AdSlide";

async function getCategory(blogId, description) {
  const categories = await Category.findAll({ blogId });

  const category = categories.find(
    (cat) =>
      cat.description.toLowerCase().replace(/\s+/g, "-") ===
      description.toLowerCase().replace(/\s+/g, "-")
  );

  return category || null;
}

async function getNewsByCategory({ blogId, category }) {
  if (!category) return [];

  const posts = await Post.findAll({ blogId });

  return posts.filter(
    (post) =>
      post.category &&
      post.category.description.toLowerCase() === category.toLowerCase()
  );
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

export default async function CategoryPage({ params, searchParams }) {
  const { uuid: blogId } = params;
  const categoryDescription = searchParams?.category;
  const categories = await getCategorias(blogId);

  if (!categoryDescription) {
    return (
      <p className="text-center text-red-500">Categoria não encontrada.</p>
    );
  }

  const category = await getCategory(blogId, categoryDescription);

  if (!category) {
    return <p className="text-center text-red-500">Categoria inexistente.</p>;
  }

  const posts = await getNewsByCategory({
    blogId,
    category: categoryDescription,
  });

  return (
    <>
      <Header categories={categories} blogId={blogId} />
      <div className="container mx-auto p-6">
        {/* PUBLICIDADE */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Publicidade</h2>
          <AdSlide blogId={blogId} width={1200} height={200} type="FOOTER" />
        </section>

        {/* Breadcrumb */}
        <div className="text-gray-500 mb-4">
          <Link href="/" className="text-orange-500">
            Home
          </Link>{" "}
          &gt;
          <Link href="/noticias" className="text-orange-500">
            Notícias
          </Link>{" "}
          &gt;
          <span className="font-semibold">{categoryDescription}</span>
        </div>

        {/* Título da categoria */}
        <h1 className="text-3xl font-bold mb-6">{categoryDescription}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lista de Notícias da Categoria */}
          <div className="col-span-2 space-y-6">
            {posts.length > 0 ? (
              posts.map((news) => (
                <Link
                  key={news.uuid}
                  className="bg-white shadow-lg rounded-lg p-4"
                  href={`/blogs/${blogId}/posts/${news.slug}`}
                >
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                  <p className="text-gray-600">{news.description}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Nenhuma notícia encontrada.
              </p>
            )}
          </div>

          {/* Sidebar com últimas notícias e anúncio */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Últimas Notícias Gerais</h2>
            {posts.slice(0, 4).map((news) => (
              <div
                key={news.uuid}
                className="bg-white shadow-lg rounded-lg p-4"
              >
                <h3 className="font-semibold text-lg">{news.title}</h3>
                <p className="text-gray-600">{news.description}</p>
                <Link
                  href={news.link || `/blogs/${blogId}/posts/${news.slug}`}
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

            {/* Espaço para Anúncio na Sidebar */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-2 text-center">
                Publicidade
              </h2>
              <AdSlide
                blogId={blogId}
                width={300}
                height={600}
                type="SIDEBAR"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
