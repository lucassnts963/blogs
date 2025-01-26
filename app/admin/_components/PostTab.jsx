"use client";
import { useState, Suspense } from "react";

import { MarkdownPostCreator } from "components/MarkdownPostCreator";

import { Plus } from "lucide-react";

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

export function PostTab({ blogs }) {
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState(blogs ? blogs[0].uuid : "");

  const [newPost, setNewPost] = useState({
    blogId: "",
    title: "",
    content: "",
    category: "",
    image: null,
    status: "draft",
  });

  return (
    <div className="bg-white rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4">Criar Nova Postagem</h2>
      <div>
        <select
          className="w-full p-2 border rounded-lg"
          value={blogId}
          onChange={(e) => setBlogId(e.target.value)}
        >
          <option value="">Selecione um blog</option>
          {blogs.map((blog) => (
            <option key={blog.uuid} value={blog.uuid}>
              {blog.name}
            </option>
          ))}
        </select>
      </div>
      {blogId !== "" && (
        <Suspense fallback={<div>Carregando...</div>}>
          <MarkdownPostCreator blogId={blogId} categories={getCategories()} />
        </Suspense>
      )}
    </div>
  );
}
