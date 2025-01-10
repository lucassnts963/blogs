// app/noticia/[slug]/page.js
import Post from "models/post";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(slug) {
  const post = await Post.findBySlug(slug);

  if (!post) {
    notFound();
  }

  return post;
}

export default async function NewsDetailPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(post.postedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-gray-500 mb-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <Link href="/noticias" className="text-blue-500 hover:text-blue-700">
          Notícias
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="font-semibold">{post.category_name}</span>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>
          )}
          <div className="flex items-center text-gray-500 text-sm">
            <time dateTime={post.postedAt}>{formattedDate}</time>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="space-y-6 text-gray-700"
          />
        </div>

        {/* Social Sharing */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Compartilhe</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Compartilhar no Facebook
            </button>
            <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500">
              Compartilhar no Twitter
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Notícia não encontrada",
      description: "A notícia que você procura não foi encontrada.",
    };
  }

  return {
    title: post.title,
    description: post.subtitle || post.title,
    openGraph: {
      title: post.title,
      description: post.subtitle || post.title,
      type: "article",
      publishedTime: post.postedAt,
      modifiedTime: post.updatedAt,
    },
  };
}
