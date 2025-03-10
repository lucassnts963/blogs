"use client";
import { useState, useEffect, Suspense } from "react";

import { MarkdownPostCreator } from "components/MarkdownPostCreator";

import { Loader2, Plus } from "lucide-react";
import { readUUIDFile } from "lib/utils";

async function fetchCategories() {
  const response = await fetch("/api/v1/categorias");
  const categorias = await response.json();
  return categorias;
}

export function PostTab({ blogId }) {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((result) => setCategories(result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4">Criar Nova Postagem</h2>
      {/* <div>
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
      </div> */}
      {blogId !== "" && (
        <Suspense
          fallback={
            <div>
              <Loader2 className="animate-spin mr-2" size={20} /> Carregando...
            </div>
          }
        >
          <MarkdownPostCreator blogId={blogId} categories={categorias} />
        </Suspense>
      )}
    </div>
  );
}
