// app/categorias/[slug]/page.js
import Link from "next/link";
import Category from "models/category";
import Post from "models/post";

async function getCategory(slug) {
  const categories = await Category.findAll();
  const category = categories.find(
    (cat) =>
      cat.description.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!category) {
    throw new Error("Failed to fetch category data");
  }

  return category;
}

async function getNewsByCategory(category) {
  const posts = await Post.findAll({
    blogId: "7848c6a6-ee92-40c6-950e-2700418dba6d",
  });

  const filteredPosts = posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );

  return posts;
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const category = await getCategory(slug);
  const posts = await getNewsByCategory(category.description);

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
        <Link href="/noticias" className="text-orange-500">
          {" "}
          Notícias
        </Link>{" "}
        &gt;
        <span className="font-semibold">{category.description}</span>
      </div>

      {/* Título da categoria */}
      <h1 className="text-3xl font-bold mb-6">{category.description}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de Notícias da Categoria */}
        <div className="col-span-2 space-y-6">
          {posts.map((news, index) => (
            <Link
              key={index}
              className="bg-white shadow-lg rounded-lg p-4"
              href={`/posts/${news.slug}`}
            >
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
              <p className="text-gray-600">{news.description}</p>
            </Link>
          ))}
        </div>

        {/* Últimas 5 Notícias Gerais */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Últimas Notícias Gerais</h2>
          {posts.slice(0, 4).map((news, index) => (
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
