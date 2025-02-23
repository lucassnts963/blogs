"use client";
import { useState } from "react";
import Link from "next/link";

import { Loader2, Plus, Trash2 } from "lucide-react";

const categories = [
  "Tecnologia",
  "Lifestyle",
  "Negócios",
  "Educação",
  "Saúde",
  "Entretenimento",
  "Esportes",
  "Viagens",
  "Notícias",
];

export function BlogTab({ user, blogs, onCreate }) {
  const [newBlog, setNewBlog] = useState({
    name: "",
    category: "Notícias",
    userId: user.id,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateBlog(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) throw new Error("Falha ao criar blog");

      const data = await response.json();
      onCreate([...blogs, data]);
      setNewBlog({
        title: "",
        description: "",
        category: "",
      });
    } catch (error) {
      console.error("Erro ao criar blog:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteBlog(blogId) {
    try {
      const response = await fetch(`/api/v1/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao deletar blog");

      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Erro ao deletar blog:", error);
    }
  }

  return (
    <div className="space-y-6">
      {user.level === "master" && (
        <div className="bg-white rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Blog</h2>
          <form onSubmit={handleCreateBlog} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Título do Blog"
                className="w-full p-2 border rounded-lg"
                value={newBlog.name}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, name: e.target.value })
                }
              />
            </div>
            <div>
              <select
                className="w-full p-2 border rounded-lg"
                value={newBlog.category}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} /> Criando
                  ...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Criar Blog
                </>
              )}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Seus Blogs</h2>
        {blogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Você ainda não tem nenhum blog. Crie seu primeiro blog acima!
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Link
                key={blog.uuid}
                href={`/blogs/${blog.uuid}`}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{blog.name}</h3>
                  <p className="text-sm text-gray-500">{blog.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded hover:bg-gray-100">
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => console.log("hello")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
