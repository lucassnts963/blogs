"use client";
import React, { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Plus,
  Trash2,
  Settings,
  Layout,
  Book,
  Image as ImageIcon,
} from "lucide-react";
import { UserSection } from "components/UserSection";
import { BlogTab } from "./_components/BlogTab";
import { PostTab } from "./_components/PostTab";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState({
    images: [],
    documents: [],
  });
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function checkAuth() {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const userData = JSON.parse(userStr);

      if (!token || !userStr) {
        window.location.href = "/autenticacao/login";
        return;
      }

      setUser(userData);
      fetchAllData(userData.id);
    }

    checkAuth();
  }, []);

  async function fetchAllData(userId) {
    setLoading(true);
    try {
      await Promise.all([
        fetchBlogs(userId),
        // fetchPosts(userId),
        // fetchMedia(userId),
      ]);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBlogs(userId) {
    try {
      const response = await fetch(`/api/v1/blogs?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao buscar blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Erro ao buscar blogs:", error);
    }
  }

  async function fetchPosts(userId) {
    try {
      const response = await fetch(`/api/v1/blogs/posts?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao buscar posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }

  async function fetchMedia(userId) {
    try {
      const response = await fetch(`/api/v1/blogs/media?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao buscar mídia");
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error("Erro ao buscar mídia:", error);
    }
  }

  async function handleMediaUpload(e, type) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await fetch("/api/v1/blogs/media", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Falha ao fazer upload");

      const data = await response.json();
      if (type === "image") {
        setMedia((prev) => ({
          ...prev,
          images: [...prev.images, data],
        }));
      } else {
        setMedia((prev) => ({
          ...prev,
          documents: [...prev.documents, data],
        }));
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
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

  async function handleDeleteMedia(mediaId, type) {
    try {
      const response = await fetch(`/api/v1/blogs/media/${mediaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao deletar mídia");

      if (type === "image") {
        setMedia((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.id !== mediaId),
        }));
      } else {
        setMedia((prev) => ({
          ...prev,
          documents: prev.documents.filter((doc) => doc.id !== mediaId),
        }));
      }
    } catch (error) {
      console.error("Erro ao deletar mídia:", error);
    }
  }

  function TabButton({ tab, active, onClick, children }) {
    return (
      <button
        onClick={() => onClick(tab)}
        className={`px-4 py-2 font-medium rounded-lg ${
          active ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {children}
      </button>
    );
  }

  if (!user) {
    return <div>Verificando login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Painel do administrador
              </h1>
              <p className="text-sm text-gray-500">Bem-vindo, {user?.email}</p>
            </div>
            <div>
              <UserSection />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <Book className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total de Blogs</p>
                <p className="text-2xl font-bold">{blogs.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <Layout className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-sm font-medium">Total de Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <ImageIcon className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Arquivos</p>
                <p className="text-2xl font-bold">
                  {media.images.length + media.documents.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex space-x-2 mb-4">
            <TabButton
              tab="blogs"
              active={activeTab === "blogs"}
              onClick={setActiveTab}
            >
              Blogs
            </TabButton>
            <TabButton
              tab="posts"
              active={activeTab === "posts"}
              onClick={setActiveTab}
            >
              Posts
            </TabButton>
            <TabButton
              tab="media"
              active={activeTab === "media"}
              onClick={setActiveTab}
            >
              Mídia
            </TabButton>
          </div>

          {/* Blogs Content */}
          {activeTab === "blogs" && (
            <BlogTab blogs={blogs} user={user} onCreate={setBlogs} />
          )}

          {/* Posts Content */}
          {activeTab === "posts" && <PostTab blogs={blogs} />}

          {/* Media Content */}
          {activeTab === "media" && (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Image Upload */}
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">Imagens</h2>
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Clique para fazer upload de imagens
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleMediaUpload(e, "image")}
                  />
                </label>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  {media.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="rounded-lg object-cover w-full h-32"
                      />
                      <button className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Upload */}
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">Documentos</h2>
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Clique para fazer upload de documentos
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleMediaUpload(e, "document")}
                  />
                </label>

                <div className="mt-4 space-y-2">
                  {media.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                      <button className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
