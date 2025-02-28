import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Post from "models/post";
import { formatDate } from "lib/utils";
import { Header } from "app/_components/Header";
import Category from "models/category";
import { Footer } from "app/_components/Footer";
import { AdSlide } from "app/_components/AdSlide";

async function getPost(slug) {
  const post = await Post.findOneBySlug(slug);
  if (!post) notFound();
  return post;
}

async function getCategories(blogId) {
  return await Category.findAll({ blogId });
}

export default async function NewsDetailPage({ params }) {
  const { slug, uuid: blogId } = params;

  try {
    const post = await getPost(slug);
    const categories = await getCategories(blogId);
    const formattedDate = formatDate(post.createdAt);
    const matterResult = matter(post.content);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    const postUrl = `https://onordesteparaense.com.br/blog/${blogId}/${slug}`; // Substitua pelo URL real do site

    function shareOnSocialMedia(platform, url, title) {
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(title);

      const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
      };

      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    }

    return (
      <>
        <Header blogId={blogId} categories={categories} />
        <div className="container mx-auto p-6">
          <div className="text-gray-500 mb-4">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              href="/noticias"
              className="text-blue-500 hover:text-blue-700"
            >
              Notícias
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="font-semibold">{post.category_name}</span>
          </div>

          <AdSlide blogId={blogId} width={1200} height={200} type="FOOTER" />

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

            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                className="space-y-6 text-gray-700 prose"
              />
            </div>

            <AdSlide blogId={blogId} width={600} height={150} type="INLINE" />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Compartilhe</h2>
              <div className="flex space-x-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    postUrl
                  )}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Compartilhar no Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    postUrl
                  )}&text=${encodeURIComponent(post.title)}`}
                  className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
                >
                  Compartilhar no Twitter
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    post.title
                  )} ${encodeURIComponent(postUrl)}`}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Compartilhar no WhatsApp
                </a>
              </div>
            </div>
          </article>
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    notFound();
  }
}

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
