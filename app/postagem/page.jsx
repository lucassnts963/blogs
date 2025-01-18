// app/posts/create/page.js
import { MarkdownPostCreator } from "components/MarkdownPostCreator";
import Category from "models/category";
import { Suspense } from "react";

// Função para buscar categorias
function getCategories() {
  return [
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
  ];
}

export default function CreatePostPage() {
  const categories = getCategories();
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID; // Ou obtenha dce onde for apropriado

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <MarkdownPostCreator blogId={blogId} categories={categories} />
    </Suspense>
  );
}
