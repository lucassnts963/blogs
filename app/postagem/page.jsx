// app/posts/create/page.js
import { MarkdownPostCreator } from "components/MarkdownPostCreator";
import Category from "models/category";
import { Suspense } from "react";

// Função para buscar categorias
async function getCategories() {
  const categories = await Category.findAll();

  if (!categories) {
    throw new Error("Falha ao carregar categorias");
  }

  return categories;
}

export default async function CreatePostPage() {
  const categories = await getCategories();
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID; // Ou obtenha de onde for apropriado

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <MarkdownPostCreator blogId={blogId} categories={categories} />
    </Suspense>
  );
}
