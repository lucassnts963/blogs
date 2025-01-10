"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Code,
  Image,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function MarkdownPostCreator({ blogId, categories }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    categoryId: "",
  });
  const [activeTab, setActiveTab] = useState("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Função auxiliar para gerar slug
  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  function insertMarkdownSyntax(prefix, suffix = "") {
    const textarea = document.getElementById("markdown-content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);

    const newContent =
      formData.content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      formData.content.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length + selectedText.length + suffix.length,
        start + prefix.length + selectedText.length + suffix.length
      );
    }, 0);
  }

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => insertMarkdownSyntax("**", "**"),
      tooltip: "Negrito",
    },
    {
      icon: Italic,
      action: () => insertMarkdownSyntax("*", "*"),
      tooltip: "Itálico",
    },
    {
      icon: Link,
      action: () => insertMarkdownSyntax("[Link](", ")"),
      tooltip: "Inserir Link",
    },
    {
      icon: List,
      action: () => insertMarkdownSyntax("- "),
      tooltip: "Lista não ordenada",
    },
    {
      icon: ListOrdered,
      action: () => insertMarkdownSyntax("1. "),
      tooltip: "Lista ordenada",
    },
    {
      icon: Code,
      action: () => insertMarkdownSyntax("`", "`"),
      tooltip: "Código inline",
    },
    {
      icon: Image,
      action: () => insertMarkdownSyntax("![Alt text](", ")"),
      tooltip: "Inserir Imagem",
    },
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validações
      if (!formData.title.trim()) {
        throw new Error("O título é obrigatório");
      }
      if (!formData.content.trim()) {
        throw new Error("O conteúdo é obrigatório");
      }
      if (!formData.categoryId) {
        throw new Error("Selecione uma categoria");
      }

      const postData = {
        blogId: "7848c6a6-ee92-40c6-950e-2700418dba6d",
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        content: formData.content.trim(),
        categoryId: formData.categoryId,
        slug: generateSlug(formData.title),
        postedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao criar o post");
      }

      const newPost = await response.json();

      // Redireciona para a página do post
      router.push(`/posts/${newPost.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Criar Novo Post</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Título do Post"
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleInputChange}
          placeholder="Subtítulo (opcional)"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma categoria</option>
          {categories?.map((category) => (
            <option key={category.uuid} value={category.uuid}>
              {category.description}
            </option>
          ))}
        </select>

        <div className="flex border-b mb-2">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === "write"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Escrever
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === "preview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Pré-visualização
          </button>
        </div>

        <div className="flex space-x-2 mb-2">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title={button.tooltip}
              disabled={isSubmitting}
            >
              <button.icon size={20} />
            </button>
          ))}
        </div>

        {activeTab === "write" && (
          <textarea
            id="markdown-content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Escreva seu post usando Markdown"
            rows={10}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        )}

        {activeTab === "preview" && (
          <div className="border rounded-md p-3 min-h-[240px]">
            {formData.content ? (
              <ReactMarkdown
                className="prose max-w-full"
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                  a: ({ node, ...props }) => (
                    <a className="text-blue-600 hover:underline" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-gray-100 p-1 rounded" {...props} />
                  ),
                }}
              >
                {formData.content}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-500 text-center">
                Sua pré-visualização aparecerá aqui
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Publicando...
            </>
          ) : (
            "Publicar Post"
          )}
        </button>
      </form>
    </div>
  );
}

export default MarkdownPostCreator;
