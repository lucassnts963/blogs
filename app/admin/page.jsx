// app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Cidades",
    image: null,
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userStr || !token) {
      router.push("/autenticacao/login");
      return;
    }

    setUser(JSON.parse(userStr));
    // Here you would fetch posts, images, and documents from your API
  }, []);

  const categories = [
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would implement image upload to your server
      console.log("Uploading image:", file);
    }
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would implement PDF upload to your server
      console.log("Uploading document:", file);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    // Here you would implement post creation logic
    console.log("Creating post:", newPost);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">Bem-vindo, {user?.name}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Post Form */}
          <section className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Criar Nova Postagem</h2>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Conteúdo
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows={6}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
              >
                <Plus className="inline-block mr-2" size={20} />
                Criar Postagem
              </button>
            </form>
          </section>

          {/* Media Management */}
          <section className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Gerenciar Imagens</h2>
              <div className="space-y-4">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto text-gray-400" size={24} />
                    <p className="mt-2 text-sm text-gray-500">
                      Clique para fazer upload de imagens
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="rounded-lg"
                      />
                      <button className="absolute top-2 right-2 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Gerenciar Documentos
              </h2>
              <div className="space-y-4">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="mx-auto text-gray-400" size={24} />
                    <p className="mt-2 text-sm text-gray-500">
                      Clique para fazer upload de PDFs
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                </label>

                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">{doc.name}</span>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
