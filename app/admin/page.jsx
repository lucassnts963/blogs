"use client";
import React, { useEffect, useState } from "react";
import { Layout, Book, Image as ImageIcon } from "lucide-react";
import { UserSection } from "components/UserSection";
import { BlogTab } from "./_components/BlogTab";
import { PostTab } from "./_components/PostTab";
import { MediaTab } from "./_components/MediaTab";

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
      await Promise.all([fetchBlogs(userId), fetchPosts(userId)]);
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
            <MediaTab media={media} onUpload={setMedia} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
