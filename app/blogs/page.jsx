"use client";
import React, { useState } from "react";
import { Search, Filter, ExternalLink } from "lucide-react";

export default function BlogDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Exemplo de dados - substitua pela sua fonte de dados real
  const blogs = [
    {
      id: "1",
      title: "Tech Insights",
      description:
        "Blog sobre as últimas novidades em tecnologia e programação",
      author: "Ana Silva",
      category: "Tecnologia",
      imageUrl: "/api/placeholder/100/100",
      followers: 1200,
      posts: 45,
    },
    {
      id: "2",
      title: "Culinária Moderna",
      description: "Receitas e dicas para uma alimentação saudável",
      author: "João Santos",
      category: "Culinária",
      imageUrl: "/api/placeholder/100/100",
      followers: 3500,
      posts: 128,
    },
    // Adicione mais blogs conforme necessário
  ];

  const categories = ["all", "Tecnologia", "Culinária", "Lifestyle", "Viagens"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Diretório de Blogs
          </h1>
          <p className="mt-2 text-gray-600">
            Descubra blogs incríveis em nossa plataforma
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar blogs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="pl-10 pr-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Todas categorias" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {blog.title}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {blog.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{blog.followers} seguidores</span>
                  <span>{blog.posts} posts</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    por {blog.author}
                  </span>
                  <a
                    href={`/blog/${blog.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Visitar blog
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum blog encontrado com os critérios selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
