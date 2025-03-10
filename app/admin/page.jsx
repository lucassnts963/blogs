"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Layout, Book, Image as ImageIcon } from "lucide-react";
import { UserSection } from "components/UserSection";
import { BlogTab } from "./_components/BlogTab";
import { PostTab } from "./_components/PostTab";
import { MediaTab } from "./_components/MediaTab";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "infra/firebase";
import { AdTab } from "./_components/AdTab";

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

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState({ images: [], documents: [], ads: [] });
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    async function fetchBlogId() {
      try {
        const response = await fetch("/uuid.txt");
        if (!response.ok) throw new Error("Erro ao carregar UUID");
        const text = await response.text();
        setBlogId(text.trim());
      } catch (error) {
        console.error("Erro ao carregar UUID:", error);
      }
    }

    fetchBlogId();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const userData = JSON.parse(userStr);

      if (!token || !userStr) {
        window.location.href = "/autenticacao/login";
        return;
      }

      setUser(userData);
      if (blogId) {
        fetchAllData(userData.id, blogId);
      }
    }
  }, [blogId]);

  async function fetchAllData(userId, blogId) {
    setLoading(true);
    try {
      await Promise.all([
        fetchBlogs(userId, blogId),
        fetchPosts(userId, blogId),
        fetchMedia(userId),
      ]);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBlogs(userId, blogId) {
    try {
      const response = await fetch(`/api/v1/blogs/${blogId}?userId=${userId}`, {
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

  async function fetchPosts(userId, blogId) {
    try {
      const response = await fetch(
        `/api/v1/blogs/${blogId}/posts?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Falha ao buscar posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Verificando login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Painel do administrador
              </h1>
              <p className="text-sm text-gray-500">Bem-vindo, {user?.email}</p>
            </div>
            <UserSection />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex space-x-2 mb-4">
            {/* <TabButton
              tab="blogs"
              active={activeTab === "blogs"}
              onClick={setActiveTab}
            >
              Blogs
            </TabButton> */}
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
              Mídias
            </TabButton>
            <TabButton
              tab="ad"
              active={activeTab === "ad"}
              onClick={setActiveTab}
            >
              Anúncios
            </TabButton>
          </div>

          {/* {activeTab === "blogs" && (
            <BlogTab blogs={blogs} user={user} onCreate={setBlogs} />
          )} */}
          {activeTab === "posts" && <PostTab blogId={blogId} />}
          {activeTab === "media" && (
            <MediaTab media={media} onUpload={setMedia} />
          )}
          {activeTab === "ad" && (
            <AdTab ads={media.ads} userId={user?.id} onUpload={setMedia} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
